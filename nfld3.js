$(function() {
  var options = {
    width: 3000,
    height: 4500,
    originX: 100,
    originY: 100,
    stepX: 150,
    stepY: 125,
    animateStart: 3000,
    animateInterval: 2000,
    duration: 1500
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

  // this renders circles according to the key in the data
  function drawCircles(data, key, xOffset) {
      var circles = svg.selectAll('circle').data(data)

      // d3 update
      circles
        // initial position
        // INITIAL POSITION HERE
        .attr('cy', 0).attr('opacity', 0)
        // transitioned position
        .transition().duration(options.duration)
        .attr('cx', options.originX + xOffset * options.stepX)
        .attr('cy', function(d, i){ return i * options.stepY + options.originY } )
        // TODO: resize function to normalize the values
        .attr('r', function(d){ return d[key] / 3 } )
        .attr('opacity', 1)
        .style('fill', 'red')

      // d3 enter
      circles.enter().append('circle')
                        .attr('r', 0)
                        .transition().duration(options.duration)
                        .attr('cx', options.originX + xOffset * options.stepX)
                        .attr('cy', function(d, i){ return i * options.stepY + options.originY } )
                        .attr('r', function(d){ return d.avg_ticket / 4 } )
                        // TODO: fill according to Hex value of team color
                        .style('fill', 'black')

      // d3 exit
      circles.exit().transition().duration(500).attr('opacity', 0).remove()


  }

  function drawLabels(data, key, xOffset) {
    var text = svg.selectAll('text.' + key).data(data)

    // update
    text.transition()
      .text( function(d) { return d[key] } )
      .attr('x', options.originX + xOffset * options.stepX)
      .attr('y', function(d, i){ return i * options.stepY + options.originY } )

    // enter
    text.enter().append('text').classed(key, true)
      .text( function(d) { return d[key] } )
      .attr('opacity', 0)
      .transition().duration(options.duration)
      .attr('opacity', 1)
      .attr('x', options.originX + xOffset * options.stepX)
      .attr('y', function(d, i){ return i * options.stepY + options.originY } )

    // exit
    text.exit().transition().duration(500).attr('r', 0).remove()

  }

  // Deferred object post processing
  function addImage(data) {
    for(i=0; i < data.length; i++)
      data[i]['image'] = 'http://i.nflcdn.com/static/site/6.1/img/logos/helmet-left-115x93/' + data[i]['abbr'].toUpperCase() + '.png'
      // data[i]['image'] = 'http://i.nflcdn.com/static/site/6.1/img/logos/svg/teams-matte-mascot/' + data[i]['team'].split(' ').pop().toLowerCase() + '.svg';
      // http://i.nflcdn.com/static/site/6.3/img/logos/teams-matte-80x53/NYG.png"
      // http://i.nflcdn.com/static/site/6.3/img/logos/helmet-left-115x93/GB.png
  }

  // TODO: this also connects the image tag to the entire data set. Should you do this with just
  //@key is the data dictionary's key that holds the src image
  function drawLogos(data, key, xOffset) {
    // implicit input here
    var images = svg.selectAll('image').data(data, function(d) { return d[key] })

    // update
    images
      .transition().duration(options.duration)
      .attr('src', function(d){ return d[key] })
      .attr('x', options.originX + xOffset * options.stepX)
      .attr('y', function(d, i) { return i * options.stepY + options.originY - .4 * options.stepY })

    // enter
    images.enter().append('image')
      .attr('xlink:href', function(d){ return d[key] })
      .transition().duration(options.duration)
      // TODO: remove hardcoded widths/heights
      .attr('width', '115px').attr('height', '93px')
      .attr('x', options.originX + xOffset * options.stepX)
      .attr('y', function(d, i) { return i * options.stepY + options.originY - .4 * options.stepY })

    // exit
    images.exit().transition().duration(500).attr('opacity', 0).remove()

  }

  // filter(items, team, afc_north)
  // @items[Array of Objects]
  // @key[String]
  // @filterList[array of key's values]
  function filterData(data, key, filterList) {
    var resultsList = []
    for(i = 0; i < data.length; i++){
      // if the data's key value exists in the filteredList
      if(filterList.indexOf(data[i][key]) > -1) {
        resultsList.push( data[i] )
      }
    }

    return resultsList
  }

  // Function tests the Update d3 by deletin
  function oneAtATime(data, interval) {
    setInterval(function() {
      data = data.splice(1, data.length - 1)
      draw(data)
    }, interval)
  }

  function draw(data) {
    drawCircles(data, 'avg_ticket', 1)
    drawLabels(data, 'team', 1.3)
    drawLogos(data, 'image', 0)
    drawLabels(data, 'avg_ticket', 2.4)
  }

  function setEvents(data) {
    $('button#nfc_north').click( function(){
        draw(filterData(data, 'team', nfc_north))
    })
    $('button#nfc_south').click( function(){
        draw(filterData(data, 'team', nfc_south))
    })
    $('button#nfc_east').click( function(){
        draw(filterData(data, 'team', nfc_east))
    })
    $('button#nfc_west').click( function(){
        draw(filterData(data, 'team', nfc_west))
    })
    $('button#afc_north').click( function(){
        draw(filterData(data, 'team', afc_north))
    })
    $('button#afc_south').click( function(){
        draw(filterData(data, 'team', afc_south))
    })
    $('button#afc_east').click( function(){
        draw(filterData(data, 'team', afc_east))
    })
    $('button#afc_west').click( function(){
        draw(filterData(data, 'team', afc_west))
    })
    $('button#avg_ticket').click( function(){
        draw(filterData(data, 'avg_ticket', afc_west))
    })
    $('button#fci').click( function(){
        draw(filterData(data, 'fci', afc_west))
    })
  }

  function animate(data) {
        // // TODO: create an animate function that calls the circle viz with animate
    // setTimeout(function(){
    //   drawCircles(filter(items, 'team', afc_north), 'avg_ticket')
    // }, options.animateStart + options.animateInterval * 1)
    // setTimeout(function(){
    //   drawCircles(filter(items, 'team', afc_east), 'avg_ticket')
    // }, options.animateStart + options.animateInterval * 2)
    // setTimeout(function(){
    //   drawCircles(filter(items, 'team', afc_south), 'avg_ticket')
    // }, options.animateStart + options.animateInterval * 3)
    // setTimeout(function(){
    //   drawCircles(filter(items, 'team', afc_west), 'avg_ticket')
    // }, options.animateStart + options.animateInterval * 4)
    // setTimeout(function(){
    //   drawCircles(filter(items, 'team', nfc_north), 'avg_ticket')
    // }, options.animateStart + options.animateInterval * 5)
    // setTimeout(function(){
    //   drawCircles(filter(items, 'team', nfc_east), 'avg_ticket')
    // }, options.animateStart + options.animateInterval * 6)
    // setTimeout(function(){
    //   drawCircles(filter(items, 'team', nfc_south), 'avg_ticket')
    // }, options.animateStart + options.animateInterval * 7)
    // setTimeout(function(){
    //   drawCircles(filter(items, 'team', nfc_west), 'avg_ticket')
    // }, options.animateStart + options.animateInterval * 8)

    // drawLabels(items, 'team')
    // // TODO: create an animate function that calls the circle viz with animate
    // setTimeout(function(){
    //   drawLabels(filter(items, 'team', afc_north), 'team')
    // }, options.animateStart + options.animateInterval * 1)
    // setTimeout(function(){
    //   drawLabels(filter(items, 'team', afc_east), 'team')
    // }, options.animateStart + options.animateInterval * 2)
    // setTimeout(function(){
    //   drawLabels(filter(items, 'team', afc_south), 'team')
    // }, options.animateStart + options.animateInterval * 3)
    // setTimeout(function(){
    //   drawLabels(filter(items, 'team', afc_west), 'team')
    // }, options.animateStart + options.animateInterval * 4)
    // setTimeout(function(){
    //   drawLabels(filter(items, 'team', nfc_north), 'team')
    // }, options.animateStart + options.animateInterval * 5)
    // setTimeout(function(){
    //   drawLabels(filter(items, 'team', nfc_east), 'team')
    // }, options.animateStart + options.animateInterval * 6)
    // setTimeout(function(){
    //   drawLabels(filter(items, 'team', nfc_south), 'team')
    // }, options.animateStart + options.animateInterval * 7)
    // setTimeout(function(){
    //   drawLabels(filter(items, 'team', nfc_west), 'team')
    // }, options.animateStart + options.animateInterval * 8)


    // drawLogos(items, 'image')
    // // TODO: create an animate function that calls the circle viz with animate
    // setTimeout(function(){
    //   drawLogos(filter(items, 'team', afc_north), 'team')
    // }, options.animateStart + options.animateInterval * 1)
    // setTimeout(function(){
    //   drawLogos(filter(items, 'team', afc_east), 'team')
    // }, options.animateStart + options.animateInterval * 2)
    // setTimeout(function(){
    //   drawLogos(filter(items, 'team', afc_south), 'team')
    // }, options.animateStart + options.animateInterval * 3)
    // setTimeout(function(){
    //   drawLogos(filter(items, 'team', afc_west), 'team')
    // }, options.animateStart + options.animateInterval * 4)
    // setTimeout(function(){
    //   drawLogos(filter(items, 'team', nfc_north), 'team')
    // }, options.animateStart + options.animateInterval * 5)
    // setTimeout(function(){
    //   drawLogos(filter(items, 'team', nfc_east), 'team')
    // }, options.animateStart + options.animateInterval * 6)
    // setTimeout(function(){
    //   drawLogos(filter(items, 'team', nfc_south), 'team')
    // }, options.animateStart + options.animateInterval * 7)
    // setTimeout(function(){
    //   drawLogos(filter(items, 'team', nfc_west), 'team')
    // }, options.animateStart + options.animateInterval * 8)

  }

  function getNFLData(url) {
    var def = $.Deferred()

    $.getJSON('nfl_ticket_data.json')
      .done(function(data) {
        addImage(data)
        setEvents(data)
        draw(data)
      })

    return def
  }


  getNFLData('nfl_ticket_data.json')

//   setTimeout(function(){draw(filterData(data, 'team', nfc_north))}, 2000)


})
