$(function() {
  var options = {
    width: 3000,
    height: 2000,
    originX: 100,
    originY: 100,
    stepX: 70,
    animateStart: 3000,
    animateInterval: 2000
  }

  var items
  var afc_north = ['Cleveland Browns', 'Baltimore Ravens', 'Cincinnati Bengals', 'Pittsburgh Steelers']
  var afc_east = ['Buffalo Bills', 'Miami Dolphins', 'New York Jets', 'New England Patriots']
  var afc_south = ['Houston Texans', 'Indianapolis Colts', 'Jacksonville Jaguars', 'Tennessee Titans']
  var afc_west = ['Denver Broncos', 'Kansas City Chiefs', 'Oakland Raiders', 'San Diego Chargers']

  var nfc_north = ['Chicago Bears', 'Detroit Lions', 'Minnesota Vikings', 'Green Bay Packers']
  var nfc_east = ['Dallas Cowboys', 'New York Giants', 'Philadelphia Eagles', 'Washington Redskins']
  var nfc_south = ['Atlanta Falcons', 'Carolina Panthers', 'New Orleans Saints', 'Tampa Bay Buccaneers']
  var nfc_west = ['Seattle Seahawks', 'Arizona Cardinals', 'San Francisco 49ers', 'St. Louis Rams']

  //http://i.nflcdn.com/static/site/6.1/img/logos/svg/teams-matte-mascot/packers.svg
  // attach base svg element
  var svg = d3.select('body').append('svg')
                        .attr('width', options.width)
                        .attr('height', options.height)

  // the main draw function
  function circleViz(data, key) {
      // create a grouping
      var circles = svg.selectAll('circle').data(data)

      // update
      circles.transition()
        .attr('cx', function(d, i){ return i * options.stepX + options.originX } )
        .attr('cy', options.originY )
        // the circle's size is the key
        // TODO: resize function to normalize the values
        .attr('r', function(d){ return d[key] / 4 } )
        .style('fill', 'black')

      // exit
      circles.exit().transition().duration(500).attr('r', 0).remove()

      // enter
      circles.enter().append('circle')
                        .attr('r', 0)
                        .transition().duration(1500)
                        .attr('cx', function(d, i){ return i * 70 + options.originX} )
                        .attr('cy', options.originY )
                        .attr('r', function(d){ return d.avg_ticket / 4 } )
                        .style('fill', 'black')
  }

  function textViz(data, key) {
    var text = svg.selectAll('text').data(data)

    text.transition()
      .text( function(d) { return d[key] } )
      .attr('x', function(d, i){ return i * options.stepX + options.originX } )
      .attr('y', options.originY - 40)

    text.enter().append('text')
      .text( function(d) { return d[key] } )
      .attr('opacity', 0)
      .transition().duration(1200)
      .attr('opacity', 1)
      .attr('x', function(d, i){ return i * options.stepX + options.originX } )
      .attr('y', options.originY - 40)

    text.exit().transition().duration(500).attr('r', 0).remove()

  }

  function imageViz(data) {
    var images = svg.selectAll('img').data(data)

    //update
    // images.transition()
    //   .attr('x', function(d, i){ return i * options.stepX + options.originX } )
    //   .attr('y', options.originY - 50)
    //   .property

    //enter

    //exit

  }

  // filter(items, team, afc_north)
  // @items[Array of Objects]
  // @key[String]
  // @filterList[array of key's values]
  function filter(items, key, filterList) {
    var resultsList = []
    for(i = 0; i < items.length; i++){
      // if the item's key exists in the filteredList
      if(filterList.indexOf(items[i][key]) > -1) {
        resultsList.push( items[i] )
      }
    }

    return resultsList
  }

  function oneAtATime(items, interval) {
    setInterval(function() {
      items = items.splice(1, items.length - 1)
      draw(items)
    }, interval)
  }

  // get initial set of data and render it
  $.getJSON('nfl_ticket_data.json', function(data) {
    items = data
    circleViz(items, 'avg_ticket')
    // TODO: create an animate function that calls the circle viz with animate
    setTimeout(function(){
      circleViz(filter(items, 'team', afc_north), 'avg_ticket')
    }, options.animateStart + options.animateInterval * 1)
    setTimeout(function(){
      circleViz(filter(items, 'team', afc_east), 'avg_ticket')
    }, options.animateStart + options.animateInterval * 2)
    setTimeout(function(){
      circleViz(filter(items, 'team', afc_south), 'avg_ticket')
    }, options.animateStart + options.animateInterval * 3)
    setTimeout(function(){
      circleViz(filter(items, 'team', afc_west), 'avg_ticket')
    }, options.animateStart + options.animateInterval * 4)
    setTimeout(function(){
      circleViz(filter(items, 'team', nfc_north), 'avg_ticket')
    }, options.animateStart + options.animateInterval * 5)
    setTimeout(function(){
      circleViz(filter(items, 'team', nfc_east), 'avg_ticket')
    }, options.animateStart + options.animateInterval * 6)
    setTimeout(function(){
      circleViz(filter(items, 'team', nfc_south), 'avg_ticket')
    }, options.animateStart + options.animateInterval * 7)
    setTimeout(function(){
      circleViz(filter(items, 'team', nfc_west), 'avg_ticket')
    }, options.animateStart + options.animateInterval * 8)

    textViz(items, 'team')
    // TODO: create an animate function that calls the circle viz with animate
    setTimeout(function(){
      textViz(filter(items, 'team', afc_north), 'team')
    }, options.animateStart + options.animateInterval * 1)
    setTimeout(function(){
      textViz(filter(items, 'team', afc_east), 'team')
    }, options.animateStart + options.animateInterval * 2)
    setTimeout(function(){
      textViz(filter(items, 'team', afc_south), 'team')
    }, options.animateStart + options.animateInterval * 3)
    setTimeout(function(){
      textViz(filter(items, 'team', afc_west), 'team')
    }, options.animateStart + options.animateInterval * 4)
    setTimeout(function(){
      textViz(filter(items, 'team', nfc_north), 'team')
    }, options.animateStart + options.animateInterval * 5)
    setTimeout(function(){
      textViz(filter(items, 'team', nfc_east), 'team')
    }, options.animateStart + options.animateInterval * 6)
    setTimeout(function(){
      textViz(filter(items, 'team', nfc_south), 'team')
    }, options.animateStart + options.animateInterval * 7)
    setTimeout(function(){
      textViz(filter(items, 'team', nfc_west), 'team')
    }, options.animateStart + options.animateInterval * 8)
  })



})
