import { Component, OnInit } from '@angular/core';
import { GoogleChartInterface, GoogleChartType } from 'ng2-google-charts';
import { HistoticMonth } from 'src/app/components/historic-month/historic-month.interface';
import { DashboardService } from './service/dashboard.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CacheService } from 'src/app/service/cache.service';
import { Platform } from '@angular/cdk/platform';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  
  public default: string = "All";

  public montlyData: any[] = [];

  public historicalMonthlyData: HistoticMonth[] = [];

  public countries: any[] = [];

  public geoChart: GoogleChartInterface = {
    chartType: GoogleChartType.GeoChart,
    dataTable: [
      ['Country', 'Total']
    ],
    options: {
      colorAxis: { colors: ['#f00000', '#7e0101', '#7e0101', '#7e0101', '#000000', '#000000', '#000000'] },
      backgroundColor: '#fff',
      datalessRegionColor: '#00000',
      defaultColor: '#00000',
      'height': 500,
    },
  };

  public pieChart: GoogleChartInterface = {
    chartType: GoogleChartType.PieChart,
    dataTable: [
      ['Country', 'Total'],
    ]
  };
  ready = false;
  constructor(private dashBoardService: DashboardService, private _snackBar: MatSnackBar, private cacheService: CacheService, public platform: Platform) {

  }

  loader: boolean = false;

  ngOnInit(): void {
    if (this.platform.IOS || this.platform.ANDROID) {
      this.pieChart.options = { 'height': 150, 'width': 300, backgroundColor: '#fff'};
      this.geoChart.options.height = '150';

    } else if (this.platform.isBrowser) {
      this.geoChart.options.height = '500';
      this.pieChart.options = { 'height': 500, 'width': 700, backgroundColor: '#fff'};
    }
    this.getCovidStat();
    this.getCovidHistoricalData();
    this.getAllCountries();
  }

  // Toast message used display message for customer
  showSnackBar(message: string) {
    this._snackBar.open(message);
  }

  //  Get the statistics 
  getCovidStat(country?: string) {
    this.ready = false;
    this.dashBoardService.getCovidStat(country).subscribe((res: any) => {
      if (res.response.length > 0) {
        // The Raido API does not have standered country list as full country name or sort name 
        // it is mixed with sort or full name due to that in map I have identified some of the importent country to change
        let data = res.response.filter((data: any) => ((data.continent != data.country))).map((data: any) => [data.country.toLowerCase() == 'usa' ? 'United States' : data.country.toLowerCase(), data.cases.total || 0]);
        this.geoChart.dataTable = [this.geoChart.dataTable[0], ...data];
        this.pieChart.dataTable = [this.pieChart.dataTable[0], ...data];
        this.ready = true;
      }
    }, err => {
      this.ready = false;
      this.showSnackBar("Something went wrong. Please try again later");
    });
  }

  // Get Historical Data from the API and Group the data by month
  getCovidHistoricalData(country?: string) {
    this.loader = true;
    this.dashBoardService.getCovidHistory(country).subscribe((res: any) => {
      if (res.response.length > 0) {
        let data = res.response.filter((data: any) => ('2022' == data.day.split(('-'))[0])).reduce((pre: any, val: any) => {
          var m = val.day.split(('-'))[1];
          (pre[m]) ? pre[m].value += Number(val.cases.new ? val.cases.new.replace('+', '') : 0) : pre[m] = { month: String(m), value: Number(val.cases.new ? val.cases.new.replace('+', '') : 0) };
          return pre;
        }, {})
        let sortByMount = Object.values(data).sort((a: any, b: any) => {
          return a.month - b.month;
        });
        this.historicalMonthlyData = sortByMount as any;
        this.loader = false;
      }
    }, err => {
      this.ready = true;
      this.loader = false;
      this.showSnackBar("Something went wrong. Please try again later");
    });
  }

  // Get All the country List and Store it in local storage to feature access
  getAllCountries() {
    const countiesCache = this.cacheService.getCacheCounties();
    if (countiesCache) {
      this.countries = countiesCache;
    } else {
      this.dashBoardService.getCountryList().subscribe((res: any) => {
        this.countries = ['All', ...res.response];
        this.cacheService.setCacheCounties(this.countries);
      }, err => {
        this.showSnackBar("Something went wrong. Unable to get Country Data");
      });
    }

  }

  // Filtering the Country
  countryChange(value: string) {
    this.ready = false;
    this.getCovidStat(value);
    this.getCovidHistoricalData(value);
  }

}