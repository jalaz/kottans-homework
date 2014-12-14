"use strict";

var _slice = Array.prototype.slice;
var View = (function () {
  var View = function View() {};

  View.setContainer = function ($container) {
    this.$container = $container;
  };

  View.render = function (templateId, model) {
    var template = Handlebars.compile($("#" + templateId).html());
    this.$container.html(template(model || {}));
  };

  return View;
})();

var AjaxInterceptor = (function () {
  var AjaxInterceptor = function AjaxInterceptor() {};

  AjaxInterceptor.init = function () {
    var tokenStorage = new Token();
    var token = tokenStorage.get();
    if (token) AjaxInterceptor.addToken(token);

    $(document).on("logined", function (e, token) {
      tokenStorage.set(token);
      AjaxInterceptor.addToken(token);
    });

    $(document).on("logedOut", function (e) {
      tokenStorage.set("");
      if ($.ajaxSettings.headers) delete $.ajaxSettings.headers["SECRET-TOKEN"];
    });
  };

  AjaxInterceptor.addToken = function (token) {
    $.ajaxSetup({
      headers: {
        "SECRET-TOKEN": token
      }
    });
  };

  return AjaxInterceptor;
})();

var API = (function () {
  var API = function API() {};

  API.init = function (api_base) {
    this.ACTIONS = {
      SIGN_UP: "" + api_base + "/signup",
      LOGIN: "" + api_base + "/login",
      USERS: "" + api_base + "/users",
      USER: "" + api_base + "/user/:id"
    };
  };

  API.post = function (url, form) {
    return $.ajax({
      type: "POST",
      url: url,
      data: form.serialize(),
      dataType: "json"
    });
  };

  API.get = function (url) {
    return $.ajax({
      type: "GET",
      url: url,
      dataType: "json"
    });
  };

  API.getUsers = function () {
    return API.get(this.ACTIONS.USERS);
  };

  API.signUp = function (form) {
    return API.post(this.ACTIONS.SIGN_UP, form);
  };

  API.login = function (form) {
    return API.post(this.ACTIONS.LOGIN, form);
  };

  API.getUser = function (id) {
    var url = this.ACTIONS.USER.replace(/:id/g, id);
    return API.get(url);
  };

  return API;
})();

var Auth = (function () {
  var Auth = function Auth() {};

  Auth.isLogined = function () {
    var tokenStorage = new Token();
    return !!tokenStorage.get();
  };

  return Auth;
})();

$(function () {
  Handlebars.registerPartial("input", $("#input-partial").html());
  Handlebars.registerPartial("password", $("#password-partial").html());
  Handlebars.registerPartial("error-summary", $("#error-summary-partial").html());
  Handlebars.registerPartial("navitem", $("#navbar-item-partial").html());
});

var ListPage = (function () {
  var ListPage = function ListPage() {
    API.getUsers().done(function (data) {
      var users = ListPage.adaptVM(data);
      View.render("list", { users: users });
    });
  };

  ListPage.adaptVM = function (data) {
    return data.map(function (el) {
      el.user.isMale = el.user.gender == "male";
      return el;
    });
  };

  return ListPage;
})();

var Navbar = (function () {
  var Navbar = function Navbar() {};

  Navbar.init = function (navbar, template) {
    this.navBar = navbar;
    this.template = Handlebars.compile(template.html());
    Navbar.render(Navbar.createVm());
  };

  Navbar.render = function (model) {
    this.navBar.html(this.template(model));
  };

  Navbar.setActive = function (path) {
    var model = Navbar.createVm();
    model.items.forEach(function (i) {
      i.active = i.path == path;
    });
    Navbar.render(model);
  };

  Navbar.createVm = function () {
    return {
      items: [{ path: "#login", title: "Login", show: !Auth.isLogined() }, { path: "#signup", title: "Signup", show: !Auth.isLogined() }, { path: "#list", title: "List my dates!", show: Auth.isLogined() }, { path: "#logout", title: "Logout", show: Auth.isLogined() }]
    };
  };

  return Navbar;
})();

var RouteMatcher = (function () {
  var RouteMatcher = function RouteMatcher() {
    this.urlVarRegex = new RegExp("/:(\\w+)");

    this.routing = {};
    this.patterns = {};
  };

  RouteMatcher.prototype.addRoute = function (path, route) {
    var list = this.isPattern(path) ? "patterns" : "routing";
    this[list][path] = route;
  };

  RouteMatcher.prototype.isPattern = function (path) {
    return this.urlVarRegex.exec(path) != null;
  };

  RouteMatcher.prototype.match = function (path) {
    return this.routing[path] || this.findInPatterns(path);
  };

  RouteMatcher.prototype.findInPatterns = function (path) {
    for (var pattern in this.patterns) {
      var routeData = this.getPatternValue(path, pattern);
      if (routeData) {
        var match = this.patterns[pattern];
        match.routeData = routeData;
        return match;
      }
    }
  };

  RouteMatcher.prototype.getPatternValue = function (path, pattern) {
    var name = this.urlVarRegex.exec(pattern)[1];
    var value = this.getRegexByPattern(pattern).exec(path);
    if (value != null) return (function (_ref) {
      _ref[name] = value[1];
      return _ref;
    })({});
  };

  RouteMatcher.prototype.getRegexByPattern = function (pattern) {
    return new RegExp(pattern.replace(this.urlVarRegex, "/(\\w+)"), "g");
  };

  return RouteMatcher;
})();

var Router = (function () {
  var Router = function Router() {};

  Router.init = function () {
    var _this = this;
    this.matcher = new RouteMatcher();

    window.onpopstate = function (event) {
      _this.go(document.location.hash, false);
    };
  };

  Router.when = function (path, route) {
    this.matcher.addRoute(path, route);
    return this;
  };

  Router.otherwise = function (routeName) {
    this.defaultRoute = routeName;
    return this;
  };

  Router.canGo = function (path) {
    return !!this.matcher.match(path);
  };

  Router.go = function (path, pushState) {
    if (pushState === undefined) pushState = true;
    var match = this.matcher.match(path);
    if (!match) match = this.matcher.match(this.defaultRoute());
    if (pushState) window.history.pushState({ path: path }, location.title, path);
    Navbar.setActive(path);
    match.init(match);
  };

  return Router;
})();

var Token = (function () {
  var Token = function Token() {
    this.TOKEN_KEY = "user.token";
  };

  Token.prototype.get = function () {
    return localStorage[this.TOKEN_KEY];
  };

  Token.prototype.set = function (token) {
    localStorage[this.TOKEN_KEY] = token;
  };

  return Token;
})();

var Utils = (function () {
  var Utils = function Utils() {};

  Utils.getErrors = function (xhr) {
    var response = JSON.parse(xhr.responseText);
    if (!response.errors) return;
    return response.errors.reduce(function (agr, cur) {
      var key = Object.keys(cur)[0];
      agr[key] = agr[key] || {};
      agr[key].error = cur[key];
      return agr;
    }, {});
  };

  Utils.getError = function (xhr) {
    var response = JSON.parse(xhr.responseText);
    if (!response.error) return;
    return response;
  };

  Utils.formToObject = function (form) {
    return form.find("input[type!=submit]").toArray().reduce(function (agr, cur) {
      var $el = $(cur);
      var key = $el.attr("name");
      agr[key] = agr[key] || {};
      agr[key].value = $el.val();
      return agr;
    }, {});
  };

  Utils.createErrorModel = function (vm, form, xhr) {
    var errors = Utils.getErrors(xhr) || Utils.getError(xhr);
    var enteredData = Utils.formToObject(form);
    return $.extend(true, SignupPage.createVM(), enteredData, errors);
  };

  return Utils;
})();

var DetailsPage = function DetailsPage(route) {
  if (!Auth.isLogined()) Router.go("#login");

  API.getUser(route.routeData.id).done(function (data) {
    var vm = data[0].user;
    View.render("details", vm);
  }).fail(function () {
    var args = _slice.call(arguments);

    console.log("fail", args);
  });
};

var ListPage = (function () {
  var ListPage = function ListPage() {
    if (!Auth.isLogined()) Router.go("#login");

    API.getUsers().done(function (data) {
      var users = ListPage.adaptVM(data);
      View.render("list", { users: users });
    });
  };

  ListPage.adaptVM = function (data) {
    return data.map(function (el) {
      el.user.isMale = el.user.gender == "male";
      return el;
    });
  };

  return ListPage;
})();

var LoginPage = (function () {
  var LoginPage = function LoginPage(route) {
    if (Auth.isLogined()) Router.go("#list");

    View.render(route.templateId, LoginPage.createVM());
    $(document).on("click", ".jsLogin", function (e) {
      e.preventDefault();
      var form = $(e.target).parents("form");
      API.login(form).done(function (data) {
        $(document).trigger("logined", data.token);
        Router.go("#list");
      }).fail(function (xhr) {
        var vm = Utils.createErrorModel(LoginPage.createVM(), form, xhr);
        View.render("login", vm);
      });
    });
  };

  LoginPage.createVM = function () {
    return {
      login: {
        placeholder: "enter your login",
        name: "login"
      },
      password: {
        placeholder: "enter your password",
        name: "password"
      }
    };
  };

  return LoginPage;
})();

var LogoutPage = function LogoutPage() {
  if (!Auth.isLogined()) Router.go("#login");

  $(document).trigger("logedOut");
  Router.go("#login");
};

var SignupPage = (function () {
  var SignupPage = function SignupPage(route) {
    if (Auth.isLogined()) Router.go("#list");

    View.render(route.templateId, SignupPage.createVM());
    $(document).on("click", ".jsSignup", function (e) {
      e.preventDefault();
      var form = $(e.target).parents("form");
      API.signUp(form).done(function (data) {
        $(document).trigger("logined", data.token);
        Router.go("#list");
      }).fail(function (xhr) {
        var vm = Utils.createErrorModel(SignupPage.createVM(), form, xhr);
        View.render("signup", vm);
      });
    });
  };

  SignupPage.createVM = function () {
    return {
      login: {
        placeholder: "enter your login",
        name: "login"
      },
      password: {
        placeholder: "enter your new password",
        name: "password"
      },
      passwordConfirmation: {
        placeholder: "retype it",
        name: "passwordConfirmation"
      }
    };
  };

  return SignupPage;
})();

(function () {
  "use strict";
  $(function () {
    API.init("http://api.sudodoki.name:8888");
    View.setContainer($(".container"));
    AjaxInterceptor.init();
    Navbar.init($(".jsNav"), $("#nav"));
    Router.init();
    Router.when("#login", { templateId: "login", init: LoginPage }).when("#signup", { templateId: "signup", init: SignupPage }).when("#list", { templateId: "list", init: ListPage }).when("#details/:id", { templateId: "details", init: DetailsPage }).when("#logout", { init: LogoutPage }).otherwise(function () {
      return Auth.isLogined() ? "#list" : "#login";
    });

    Router.go(location.hash);
  });
})();
//# sourceMappingURL=app.js.map