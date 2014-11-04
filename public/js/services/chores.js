// js/services/chores.js
angular.module('choreService', [])

    // super simple service
    // each function returns a promise object 
    .factory('Chores', function($http) {
        return {
            get : function() {
                return $http.get('/api/chores');
            },
            create : function(choreData) {
                return $http.post('/api/chores', choreData);
            },
            delete : function(id) {
                return $http.delete('/api/chores/' + id);
            }
        }
    });