import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators, FormArray, AbstractControl, ValidationErrors} from '@angular/forms';

export function checkBalanced (c: AbstractControl): ValidationErrors | null {
  //safety check
  var debitAmounts = c.get('debitAmounts') as FormArray;
  var creditAmounts = c.get('creditAmounts') as FormArray;

  
  let debitScore = 0;
  for (let amount in c.get('debitAmounts')!.value) {
    debitScore += +debitAmounts.value[amount]
  } 

  let creditScore = 0;
  for (let amount in c.get('creditAmounts')!.value) {
    creditScore += +creditAmounts.value[amount]
  }
  
  if (debitScore == creditScore) {
    return null
  }
  
  return {notBalanced: true}
}

@Component({
  selector: 'app-transaction-form',
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.css']
})

export class TransactionFormComponent {
  transactionForm = this.fb.group({
      debitAccounts: this.fb.array([
        this.fb.control('', Validators.required)
      ]),
      debitAmounts: this.fb.array([
        this.fb.control('', Validators.required)
      ]),
      creditAccounts: this.fb.array([
        this.fb.control('', Validators.required)
      ]),
      creditAmounts: this.fb.array([
        this.fb.control('', Validators.required)
      ]),
      action: this.fb.array([
        this.fb.control('', Validators.required)
      ]),
      property: this.fb.array([
        this.fb.control('')
      ]),
      player: this.fb.array([
        this.fb.control('')
      ]),
    },
    { validators: checkBalanced }
  )

  get debitAmounts() {
    return this.transactionForm.get('debitAmounts') as FormArray
  }

  get creditAmounts() {
    return this.transactionForm.get('creditAmounts') as FormArray
  }

  totalDebits = this.calcTotalDebits();
  totalCredits = this.calcTotalCredits();

  calcTotalDebits() {
    let score = 0;
    for (let amount in this.debitAmounts.value) {
      score += +this.debitAmounts.value[amount]
    }
    return score
  }

  calcTotalCredits() {
    let score = 0;
    for (let amount in this.creditAmounts.value) {
      score += +this.creditAmounts.value[amount]
    }
    return score
  }

  constructor(private fb: FormBuilder) { 
  }

  get debitAccounts() {
    return this.transactionForm.get('debitAccounts') as FormArray
  }
  get creditAccounts() {
    return this.transactionForm.get('creditAccounts') as FormArray
  }

  get action() {
    return this.transactionForm.get('action') as FormArray
  }

  get property() {
    return this.transactionForm.get('property') as FormArray
  }

  get player() {
    return this.transactionForm.get('player') as FormArray
  }

  addDebit() {
    this.debitAccounts.push(this.fb.control('', Validators.required))
    this.debitAmounts.push(this.fb.control('', Validators.required))
  }

  addCredit() {
    this.creditAccounts.push(this.fb.control('', Validators.required))
    this.creditAmounts.push(this.fb.control('', Validators.required))
  }

  actionTextToggle = false;
  showCustomText() {
    this.actionTextToggle = !this.actionTextToggle
    if (this.actionTextToggle) {
      document.getElementById("action-selection")!.style.display = "none"
      document.getElementById("action-text")!.style.display = "block"
    }
    else {
      document.getElementById("action-selection")!.style.display = "block"
      document.getElementById("action-text")!.style.display = "none"
    }
  }


  @Input() sortedAccounts!: string[][];
  @Input() players!: string[];
  @Output() formDetails = new EventEmitter<string[][][][]>();
  onSubmit() {
    let debitAccountsValues = this.debitAccounts.value
    let debitAmountsValues = this.debitAmounts.value
    let creditAccountsValues = this.creditAccounts.value
    let creditAmountsValues = this.creditAmounts.value
    let actionValues = this.action.value
    let propertyValues = this.property.value
    let playersValues = this.player.value
    
    if (typeof debitAccountsValues === "string") {
      debitAccountsValues = [debitAccountsValues]
    }
    if (typeof debitAmountsValues === "string") {
      debitAmountsValues = [debitAmountsValues]
    }
    if (typeof creditAccountsValues === "string") {
      creditAccountsValues = [creditAccountsValues]
    }
    if (typeof creditAmountsValues === "string") {
      creditAmountsValues = [creditAmountsValues]
    }

    //console.warn(debitAccountsValues);
    //console.warn(debitAmountsValues);
    //console.warn(creditAccountsValues);
    //console.warn(creditAmountsValues);

    //console.warn([[[this.debitAccounts.value], [this.debitAmounts.value]], [[this.creditAccounts.value], [this.creditAmounts.value]]]);
    let date = new Date();
    this.formDetails.emit([[debitAccountsValues, debitAmountsValues], 
      [creditAccountsValues, creditAmountsValues],
      [[
        [actionValues, propertyValues, playersValues].filter(string => string != "").join(" - "),
        [date.getFullYear().toString(), Intl.DateTimeFormat('en-us', {month: 'short'}).format(date.getMonth()), date.getDay().toString()].join(" ")]
      ]])
  }

  
  propertiesKeys: string[] = [];
  ngAfterViewInit() {
    this.propertiesKeys = this.sortedAccounts[5]
  }

  onAccountsKey(value : any) {
    value = <HTMLInputElement>value.value
    this.propertiesKeys = this.searchProperties(value);
  }
  
  searchProperties(value: string){
    let filter = value.toLowerCase();
    return this.sortedAccounts[5].filter(
      option => option.toLowerCase().startsWith(filter)
    )
  }

  log(e : any) {
    console.log(e)
  }
}

