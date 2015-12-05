var tpl = '<!doctype html>\n' +
          '<html ng-app="<%= appName %>">\n' +
          '<head>\n' +
          '  <title><%= name %></title>\n' +
          '  <link rel="stylesheet" type="text/css" href="app/public/stylesheets/app.min.css">\n' +
          '  <script type="text/javascript" src="./app/public/javascripts/index.js"></script>\n' +
          '</head>\n' +
          '<body>\n' +
          '  <header ng-include="\'<%= root %>/views/shared/header.html\'"></header>\n' +
          '  <main class="container" ui-view></main>\n' +
          '  <footer class="container" ng-include="\'<%= root %>/views/shared/footer.html\'"></footer>\n'  +
          '</body>\n'  +
          '</html>\n';

module.exports = tpl;