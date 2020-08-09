import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {EntriesService} from '../../entries/shared/entries.service';
import {CategoryService} from '../../categories/shared/category.service';
import {Category} from '../../categories/shared/Category.model';
import {Entry} from '../../entries/shared/Entry';
import currencyFormatter from 'currency-formatter';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  @ViewChild('month', {static: true}) month: ElementRef;
  @ViewChild('year', {static: true}) year: ElementRef;

  categories: Category[] = [];
  entries: Entry[] = [];


  expenseTotal: any = 0;
  revenueTotal: any = 0;
  balance: any = 0;

  expenseChartData: any;
  revenueChartData: any;

  chartOptions = {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  };

  constructor(private entryService: EntriesService, private categoryService: CategoryService) {
  }

  ngOnInit() {
    this.categoryService.getAll().subscribe(value => {
      this.categories = value;
    }, error => {
      console.log(error);
    });
  }


  generateReports() {
    const month = this.month.nativeElement.value;
    const year = this.year.nativeElement.value;
    if (!month || !year) {
      alert('Informe o mês e o ano!');
      return;
    }

    this.entryService.getByMonthAndYear(month, year).subscribe(this.setValues.bind(this));
  }

  private setValues(entries: Entry[]) {
    this.entries = entries;
    this.calculateBalance();
    this.setChartsData();
  }

  private calculateBalance() {
    let expenseTotal = 0;
    let revenueTotal = 0;

    this.entries.forEach(entry => {
      if (entry.type == 'revenue') {
        revenueTotal += currencyFormatter.unformat(entry.amount, {code: 'BRL'});
      } else {
        expenseTotal += currencyFormatter.unformat(entry.amount, {code: 'BRL'});
      }
    });

    this.expenseTotal = currencyFormatter.format(expenseTotal, {code: 'BRL'});
    this.revenueTotal = currencyFormatter.format(revenueTotal, {code: 'BRL'});
    this.balance = currencyFormatter.format(revenueTotal - expenseTotal, {code: 'BRL'});
  }

  private setChartsData() {
    this.revenueChartData = this.getChartData("revenue", "#9CCC65", "Gráfico de Receitas");
    this.expenseChartData = this.getChartData("expense", "#e03131", "Gráfico de Despesas");
    console.log(this.expenseChartData);
  }

  private getChartData(entryType: string, backgroundColor: string, title: string) {
    const chartData = [];
    this.categories.forEach(category => {
      let filteredEntry = this.entries.filter(entry => entry.categoryId == category.id && entry.type == entryType);
      if (filteredEntry.length > 0) {
        let totalAmount = 0;
        filteredEntry.forEach((entry) => totalAmount += currencyFormatter.unformat(entry.amount, {code: 'BRL'}, 0));
        chartData.push({
          categoryName: category.name,
          totalAmount: totalAmount
        });
      }
    });
    return {
      labels: chartData.map(item => item.categoryName),
      datasets: [{
        label: title,
        backgroundColor: backgroundColor,
        data: chartData.map(item => item.totalAmount)
      }]
    };
  }
}
