/*
Copyright (c) 2010-2014, Michael Bostock
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:

* Redistributions of source code must retain the above copyright notice, this
  list of conditions and the following disclaimer.

* Redistributions in binary form must reproduce the above copyright notice,
  this list of conditions and the following disclaimer in the documentation
  and/or other materials provided with the distribution.

* The name Michael Bostock may not be used to endorse or promote products
  derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL MICHAEL BOSTOCK BE LIABLE FOR ANY DIRECT,
INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING,
BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY
OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

var width = 960,
    height = 600;

var fill = d3.scale.category10();

var nodes = [
{ text:"Curriculum Vitae",link:"cv",image:"green"},
{ text:"Home",link:"index",image:"red"},
{ text:"Blog",link:"blog",image:"blue"}
]

var force = d3.layout.force()
    .nodes(nodes)
    .size([width, height])
    .charge(-1700)
    .on("tick", tick)
    .start();

var svg = d3.select("#placehold").append("svg")
    .attr("width", width)
    .attr("height", height);

var node = svg.selectAll(".node")
    .data(nodes)
  .enter()
  .append("a")
    .attr("xlink:href", function(d) {return "/"+d.link+".html"})
    .append("g")
      .attr("class", "node")
      .on("mouseover", mouseover)
      .on("mouseout", mouseout)
      .on("mousedown", function() { d3.event.stopPropagation(); })
      .call(force.drag);

/*
node.append("circle")
    .attr("r", 30)
    .style("fill", function(d, i) { return fill(i & 3); })
    .style("stroke", function(d, i) { return d3.rgb(fill(i & 3)).darker(5); });*/

node.append("image")
      .attr("x", -5)
      .attr("y", -5)
      .attr("width", 80)
      .attr("height", 80)
      .attr("xlink:href", function(d) {return "/images/"+d.image+".png"});

node.append("text")
    .attr("x", 30)
    .attr("y", -15)
    //.attr("dy", "3em")
    .text(function(d) { return d.text; })
    //.style("opacity",0);


svg.style("opacity", 1e-6)
  .transition()
    .duration(1000)
    .style("opacity", 1);

d3.select("body")
    .on("mousedown", mousedown);

function tick() {
  node
      .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
}

function mouseover() {
  d3.select(this).select("image").transition()
      .duration(750)
      .attr("width", 100)
      .attr("height", 100);
      //.attr("r", 40);
 /* d3.selectAll("text").transition()
    .duration(750)
    .style("opacity",1);*/
}

function mouseout() {
  d3.select(this).select("image").transition()
      .duration(750)
      .attr("width", 80)
      .attr("height", 80);
      //.attr("r", 30);
  /*d3.selectAll("text").transition()
    .duration(750)
    .style("opacity",0);*/
}

function mousedown() {
  nodes.forEach(function(o, i) {
    o.x += (Math.random() - .5) * 45;
    o.y += (Math.random() - .5) * 45;
  });
  force.resume();
}