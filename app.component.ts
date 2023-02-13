// import { Component, Inject, ViewChild, ElementRef, OnInit, AfterViewInit } from '@angular/core'; import { ActivatedRoute, Router } from '@angular/router';
import {	Chart,	ChartType} from 'chart.js';
import {	default as us_json} from 'us-atlas/states-10m.json';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {	ChoroplethController,	ProjectionScale,	ColorScale,	GeoFeature} from 'chartjs-chart-geo';
import {	AfterViewInit,	Component,	ElementRef,	OnInit,	ViewChild} from '@angular/core';
import {	geoPath} from 'd3-geo';
import { state } from '@angular/animations';

//import geoAlbersUsaTerritories from "geo-albers-usa-territories";
var ChartGeo = require("chartjs-chart-geo");
const geoAlbersUsaTerritories = require("geo-albers-usa-territories");
const projection = geoAlbersUsaTerritories.geoAlbersUsaTerritories();
const path = geoPath(projection);
const nation  = ChartGeo.topojson.feature(us_json, us_json.objects['nation']).features[0];
const states = ChartGeo.topojson.feature(us_json, us_json.objects['states']).features;
//const territories ChartGeo.topojson.feature (us_json, us_json.objects['states']).features;
@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  ngOnInit(): void {
    console.log('projection is', projection);
        console.log('states is', states);
  }

	title(title: any) {
			throw new Error('Method not implemented.');
  };
  canvas: any;
  ctx: any;
  @ViewChild('mychart', {static: false})
  //public mychart: ElementRef = {} as ElementRef;
  public mychart: any;
  geoChartType: ChartType = "choropleth";
  geoChart Legend = false;
  geoChartLabels: any[] = states.map((d: {properties:{name: any;};}) => d.properties.name);
  geoColors = states.map(() => ({}));

      ngAfterViewInit(): void {
        // this.ctx this.mychart.nativeElement.getContext('2d');
        Chart.register(ChoroplethController, GeoFeature, ColorScale, ProjectionScale, ChartDataLabels);
        let updatedState = states.map((d: any) => {path(d)});
        console.log('projection is', updatedState);

        this.mychart = new Chart("myChart", {
          type: this.geoChartType,
          data: {
            labels: this.geoChartLabels,
            datasets: [
              {
                outline: states,
                label: "States",
                data: states.map((d:any) => ({feture: d, value: Math.random() *10})),
              }
            ]
          },
          options: {
            plugins: {
              legend: {
                  display: false
              },
              datalabels: {
                display: false,
              },
            },
            scales: {
                projection:{
                  axis: 'x',
                  projection: 'albers',
                    display: false,
                  },

            color: {
              axis: 'x',
              legend:{
                position: 'bottom-right',
                align: 'bottom',
              },
            }
            },
          }
          });
