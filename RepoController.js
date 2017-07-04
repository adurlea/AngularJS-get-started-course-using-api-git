// Code goes here

(function() {

  var app = angular.module("githubViewer");

  var RepoController = function($scope, github, $routeParams) {

    var onRepoComplete = function(data) {
      $scope.repo = data;

      github.getRepoContrib($scope.repo.contributors_url)
        .then(onRepoContrib, onError);
    };

    var onRepoContrib = function(data) {
      $scope.repoContribs = data;
    };

    var onError = function(reason) {
      $scope.error = "Could not fetch the repo data";
    };

    $scope.username = $routeParams.username;
    $scope.reponame = $routeParams.reponame;

    github.getRepo($scope.username, $scope.reponame).then(onRepoComplete, onError);
  };

  app.controller("RepoController", RepoController);

}());