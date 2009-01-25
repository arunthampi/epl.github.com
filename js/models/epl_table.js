EPL = typeof EPL == 'undefined' || !EPL ? {} : EPL;

EPL.Table = function(is_iphone) {
  this.table = [];
  this.is_iphone = is_iphone;
  if(this.is_iphone) {
    $('a#backButton').hide();
  }
};


EPL.Table.prototype.initialize_teams = function() {
  var self = this;
  $.getJSON("/js/epl/all_teams.js",
    function(data) {
      for(var i = 0; i < data.length; i++) {
        self.table.push(data[i]);
        if(self.is_iphone) {
          self.write_team_standings_to_iphone_view(data[i], i + 1);
        } else {
          self.write_team_standings_to_normal_view(data[i], i + 1);  
        }
      }
      self.initialize_fixtures_bindings();
    });
};

EPL.Table.prototype.initialize_fixtures_bindings = function() {
  var self = this;
  
  $("a.fixtures").bind("click", function(e) {
    var id = e.currentTarget.id;
    if(self.is_iphone) {
      self.show_fixtures_iphone_view(id);
    } else {
      self.show_fixtures_normal_view(id);
    }
    return false;
  });
};

EPL.Table.prototype.show_fixtures_normal_view = function(id) {
  var self = this;
  var html = "<span id=\"fixtures_" + id + "\">";
  
  $.getJSON("/js/epl/teams/fixtures/" + id + ".js",
    function(fixtures) {
      for(var i = 0; i < fixtures.length; i++) {
        html += "<span id=\"fixtures_" + id + "_" + (i + 1) + "\">";
        html += "<span><b>" + fixtures[i].competition + "</b></span>";
        html += "<span><i>" + fixtures[i].details + "</i></span>";
        html += "<span><b>" + fixtures[i].date + ", " + fixtures[i].gmt_time + " GMT</b></span>";
        html += "</span><hr />";
      }
      html += "</span>";
      $('p#long_form_p').replaceWith(html);
    });
};

EPL.Table.prototype.show_fixtures_iphone_view = function(id) {
  var self = this;
//  var html = "<li id=\"fixtures_" + id + "\">";
  var html = "<ul id=\"epl_iphone_table\">";
  
  $.getJSON("/js/epl/teams/fixtures/" + id + ".js",
    function(fixtures) {
      for(var i = 0; i < fixtures.length; i++) {
        html += "<li id=\"fixtures_" + id + "_" + (i + 1) + "\">";
        html += "<p><b>" + fixtures[i].competition + "</b></p>";
        html += "<p><i>" + fixtures[i].details + "</i></p>";
        html += "<p><b>" + fixtures[i].date + ", " + fixtures[i].gmt_time + " GMT</b></p>";
        html += "</li>";
      }
      html += "</ul>";
      
      $('ul#epl_iphone_table').replaceWith(html);
      $('a#backButton').show();
    });
};


EPL.Table.prototype.write_team_standings_to_iphone_view = function(team, rank) {
  $('#epl_iphone_table').append(
    "<li class=\"arrow\"><p class=\"standing\"><span class=\"rank\">" + rank + "</span><span class=\"name\">" + 
    "<a class=\"fixtures\" id=\"" + team.id + "\" href=\"/teams/fixtures/" + team.id + "\">" + team.name + "</a></span><span class=\"played\">" + team.total_played + "</span><span class=\"gd\">" + team.goal_difference + "</span><span class=\"pts\">" + team.points + "</span></p></li>"
  );
};

EPL.Table.prototype.write_team_standings_to_normal_view = function(team, rank) {
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