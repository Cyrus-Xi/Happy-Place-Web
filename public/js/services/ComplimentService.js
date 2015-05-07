angular.module('ComplimentService', []).factory('Compliment', ['$http', function($http) {

    return {
        // call to get all compliments
        get : function() {
            return $http.get('/api/compliments');
        },


                // these will work when more API routes are defined on the Node side of things
        // call to POST and create a new compliment
        create : function(complimentData) {
            return $http.post('/api/compliments', complimentData);
        },

        // call to DELETE a compliment
        delete : function(id) {
            return $http.delete('/api/compliments/' + id);
        }
    }       

}]);
