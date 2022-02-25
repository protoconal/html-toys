import { Component, ViewChild, ElementRef, AfterViewInit, HostListener, Renderer2, Inject, TemplateRef} from '@angular/core';
import accounts from '../assets/accounts.json' ;
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements AfterViewInit{
  title = 'monopoly';
  imgDirRoot = "./assets/img/";
  
  // https://www.carlrippon.com/typescript-dictionary/
  balance: { [money: number]: number } = {1:5, 5:1, 10:2, 20:1, 50:1, 100:4, 500:2 };
  balanceKeys = Object.keys(this.balance)
  accountsValues = Object.values(accounts)

  findAccountTypes() {
    let assetAccounts = [];
    let liabilityAccounts = [];
    let expenseAccounts = [];
    let creditAccounts = [];
    let actionStatements = [];
    let properties = [];

    for (let account of this.accountsValues) {
      switch (+account[0]) {
        case 1:
          assetAccounts.push(account[1])
        break;
        case 2:
          liabilityAccounts.push(account[1])
        break;
        case 3:
        break;
        case 4:
          creditAccounts.push(account[1])
        break;
        case 5:
          expenseAccounts.push(account[1])
        break;
        case 6:
          actionStatements.push(account[1])
        break;
        case 7:
          properties.push(account[1])
        break;
      }
    }
    return [assetAccounts, expenseAccounts, creditAccounts, liabilityAccounts, actionStatements, properties]
  }
  sortedAccounts = this.findAccountTypes()

  updateBalance() {
    let score = 0;
    for (let index in this.balanceKeys) {
      let value : number = +this.balanceKeys[index]
      let amount = this.balance[value]
      score += amount * value
    }
    score = 0;
    
    // only consider debits to cash

    let cashDebits : number = 0;
    for (let transaction in this.journal) {
      let cashIndex = this.journal[transaction][0][0].indexOf('Bank')
      if (cashIndex > -1) {
        cashDebits += +this.journal[transaction][0][1][cashIndex]
      }
    }

    let cashCredits : number = 0;
    for (let transaction in this.journal) {
      let cashIndex = this.journal[transaction][1][0].indexOf('Bank')
      if (cashIndex > -1) {
        cashCredits += +this.journal[transaction][1][1][cashIndex]
      }
    }
    return score + cashDebits - cashCredits
  }

  totalBalance = this.updateBalance();

  add(accumulator : number, a : number) {
    return accumulator + a;
  }

  addScore(moneyType : number) {
    this.balance[moneyType] += 1
  }

  subtractScore(moneyType : number) {
    if (this.balance[moneyType] != 0) {
      this.balance[moneyType] -= 1
    }
  }

  @ViewChild("moneyCounter") private moneyCounter!: ElementRef<HTMLElement>;

  @HostListener('window:resize', ['$event'])
  onResize() {
    // set the height of the moneycounter
    var moneyCounterHeight = this.moneyCounter.nativeElement
    .children[0].children[0].children[0].children[0].clientHeight;
    this.moneyCounter.nativeElement.style.height = moneyCounterHeight.toString() + "px";
  }

  constructor(public dialog: MatDialog, private renderer: Renderer2) {}

  ngAfterViewInit() {
    this.onResize()
    this.updateBalance()
  }

  @ViewChild('dialogTemplate') customTemplate!: TemplateRef<any>;
  openDialogForm() {
    const dialogRef = this.dialog.open(this.customTemplate, {
      width: '95%'
    });
    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
    });
    // this.dialog.open(DialogElementsExampleDialog);
  }

  journal_1: string[][][][] = [
    [[["Cash", "CloudStuff"], ["100", "100"]],[["Cash"], ["100"]], [["Description"]]],
    [[["Cash"], ["100"]],[["Cash"], ["100"]], [["Description"]]],
    [[["Cash"], ["100"]],[["Cash"], ["100"]], [["Description"]]]
  ];

  journal: string[][][][] = [];

  started: boolean = false;
  startGame(){
    this.started = true;
    let date = new Date();
    this.journal.push(
      [[["Bank"],["1500"]], [[this.players[0] + ", Capital"],["1500"]], [["opening entry", [date.getFullYear().toString(), Intl.DateTimeFormat('en-us', {month: 'short'}).format(date.getMonth()), date.getDay().toString()].join(" ")]]]
      );
  }

  collectGo(){
    let date = new Date();
    this.journal.push(
      [[["Bank"],["200"]], [["Go Revenue"],["200"]], [["collected go", [date.getFullYear().toString(), Intl.DateTimeFormat('en-us', {month: 'short'}).format(date.getMonth()), date.getDay().toString()].join(" ")]]]
      );
  }

  players: string[] = ["Player 1", "Player 2", "Player 3", "Player 4"];
  
  updatePlayers(){
    let htmlComponent = document.getElementById("playersPanel")!.parentElement!.children
    for (let x = 0; x != 4; x++) {
      this.players[x] = (<HTMLInputElement>htmlComponent[x]!.firstElementChild!.firstElementChild!.firstElementChild!.firstElementChild).value
    }
  }

  handleFormSubmit(e : any) {
    console.log(e)
    console.log(this.journal)
    this.journal.push(e)
    this.dialog.closeAll();
  }

  downloadJournal(){
    let a = document.createElement("a")
    let dataStr = "data:text/json;charset=utf-8," + 
      encodeURIComponent(JSON.stringify(this.journal))
    a.setAttribute("download", "journal.json")
    a.setAttribute("href", dataStr)
    a.click()
  }

  file: any;
  file_result: any;
  generateFilePrompt(){
    let a = document.createElement("input")
    a.type = "file"
    a.onchange = (e) => {
      this.file = (<HTMLInputElement>e.target).files![0]
      this.dealWithFile()
    }
    a.click()
  }

  dealWithFile(){
    let reader = new FileReader();
    reader.onload = (e) => {
      this.journal = JSON.parse(<string> reader.result)
      this.started = true
    }
    reader.readAsText(this.file)
  }

  log(e : any) {
    console.log(e)
  }
}

