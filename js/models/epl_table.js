EPL = typeof EPL == 'undefined' || !EPL ? {} : EPL;

EPL.Table = function() {
  this.table = [];
};


EPL.Table.prototype.initialize_teams = function() {
  var self = this;
  
  $.getJSON("/js/epl/all_teams.js",
    function(data) {
      for(var i = 0; i < data.length; i++) {
        team = data[i];
        self.table.push(team);
        
        $('#epl_long_form_table').append(
          "<tr>" + 
          "<td>" + (i + 1) + "</td><td>" + team.name + "</td>" + 
          "<td>" + team.total_played + "</td><td>" + team.home_won + "</td>" + 
          "<td>" + team.home_drawn + "</td><td>" + team.home_lost + "</td>" + 
          "<td>" + team.home_for + "</td><td>" + team.home_against + "</td>" + 
          "<td>" + team.away_won + "</td><td>" + team.away_drawn + "</td>" + 
          "<td>" + team.away_lost + "</td><td>" + team.away_for + "</td>" + 
          "<td>" + team.away_against + "</td><td>" + team.goal_difference + "</td>" + 
          "<td>" + team.points + "</td>" + 
          "</tr>");
      }
  });
};