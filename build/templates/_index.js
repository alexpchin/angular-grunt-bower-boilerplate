<!doctype html>
<html ng-app="app">
<head>
  <title>Minimal Angular App</title>
  <link rel="stylesheet" type="text/css" href="app/public/stylesheets/app.min.css">
  <script type="text/javascript" src="app/public/components/jquery/dist/jquery.js"></script>
  <script type="text/javascript" src="./app/public/javascripts/index.js"></script>
</head>
<header ng-include="'app/public/views/shared/header.html'"></header>
<body>
  <main class="container" ui-view></main>
</body>
<footer class="container" ng-include="'app/public/views/shared/footer.html'"></footer>
</html>