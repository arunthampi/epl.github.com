EPL = typeof EPL == 'undefined' || !EPL ? {} : EPL;

EPL.Table = function() {
  this.table = [];
};


EPL.Table.prototype.initialize_teams = function() {
  var self = this;
  $.getJSON("/js/epl/all_teams.js",
    function(data) {
      for(var i = 0; i < data.length; i++) {
        self.table.push(data[i]);
        self.write_team_standings_to_view(data[i], i + 1);
      }
      self.initialize_fixtures_bindings();
    });
};

EPL.Table.prototype.initialize_fixtures_bindings = function() {
  var self = this;
  
  $("a.fixtures").bind("click", function(e) {
    var id = e.currentTarget.id;
    self.show_fixtures_view(id);
    return false;
  });
};

EPL.Table.prototype.show_fixtures_view = function(id) {
  var self = this;
  var html = "<div id=\"fixtures_" + id + "\">";
  console.debug("Going to get JSON");
  
  $.getJSON("/js/epl/teams/fixtures/" + id + ".js",
    function(fixtures) {
      console.debug("Got Fixtures");
      
      for(var i = 0; i < fixtures.length; i++) {
        html += "<div id=\"fixtures_" + id + "_" + (i + 1) + "\">";
        html += "<p><b>" + fixtures[i].competition + "</b></p>";
        html += "<p><i>" + fixtures[i].details + "</i></p>";
        html += "<p><b>" + fixtures[i].date + ", " + fixtures[i].gmt_time + " GMT</b></p>";
        html += "</div><hr />";
      }
      html += "</div>";
      $('div#long_form_div').replaceWith(html);
    });
};

EPL.Table.prototype.write_team_standings_to_view = function(team, rank) {
  $('#epl_long_form_table').append(
    "<tr>" + 
    "<td>" + rank + "</td><td><a class=\"fixtures\" id=\"" + team.id + "\" href=\"/teams/fixtures/" + team.id + "\">" + team.name + "</a></td>" + 
    "<td>" + team.total_played + "</td><td>" + team.home_won + "</td>" + 
    "<td>" + team.home_drawn + "</td><td>" + team.home_lost + "</td>" + 
    "<td>" + team.home_for + "</td><td>" + team.home_against + "</td>" + 
    "<td>" + team.away_won + "</td><td>" + team.away_drawn + "</td>" + 
    "<td>" + team.away_lost + "</td><td>" + team.away_for + "</td>" + 
    "<td>" + team.away_against + "</td><td>" + team.goal_difference + "</td>" + 
    "<td>" + team.points + "</td>" + 
    "</tr>");
};