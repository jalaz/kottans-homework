$(()=>{
    Handlebars.registerPartial("input", $("#input-partial").html());
    Handlebars.registerPartial("password", $("#password-partial").html());
    Handlebars.registerPartial("error-summary", $("#error-summary-partial").html());
    Handlebars.registerPartial("navitem", $("#navbar-item-partial").html());
})
  