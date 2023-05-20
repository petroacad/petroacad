document.addEventListener("DOMContentLoaded", statForm);
document.getElementById("ctrpay").setAttribute("style", "background-color: #4d2557;color: white;font-size:16px;");
document.getElementById("trpay").setAttribute("style", "color: white;font-size:16px;");
function changeForm(){

  if (document.getElementById("radio_paypal").checked)
  {
  document.getElementById("paypal_form").style.display='block';
  document.getElementById("transaction_form").style.display='none';
  document.getElementById("registerButton").style.display='none';
  document.getElementById("courseDetails").style.display='none';
  document.getElementById("ctrpay").setAttribute("style", "background-color: none;");
  document.getElementById("trpay").setAttribute("style", "color: none;font-size:16px;");
  document.getElementById("celpay").setAttribute("style", "background-color: #4d2557");
  document.getElementById("elpay").setAttribute("style", "color: white;font-size:16px;");
  }
  if(document.getElementById("radio_transaction").checked)
  {	document.getElementById("paypal_form").style.display='none';
  document.getElementById("transaction_form").style.display='block';
  document.getElementById("registerButton").style.display='block';
  document.getElementById("courseDetails").style.display='block';
  document.getElementById("registerButton").setAttribute("style", "text-align:center;");
  document.getElementById("elpay").setAttribute("style", "background-color: none;font-size:16px;");
  document.getElementById("celpay").setAttribute("style", "color: none;font-size:16px;");
  document.getElementById("trpay").setAttribute("style", "color: white;font-size:16px;");
  document.getElementById("ctrpay").setAttribute("style", "background-color: #4d2557;font-size:16px;");
  }
  }
  changeForm();
document.getElementById("paypal_form").style.display='none';
function initPayPalButton() {
var shipping = 0;
var itemOptions = document.querySelector("#smart-button-container #item-options");
var quantity = parseInt();
var quantitySelect = document.querySelector("#smart-button-container #quantitySelect");
if (!isNaN(quantity)) {
quantitySelect.style.visibility = "visible";
}
var orderDescription = 'اختر المبلغ الذي تود دفعه من القائمة المنسدلة';
if(orderDescription === '') {
orderDescription = 'Item';
}
paypal.Buttons({
style: {
shape: 'pill',
color: 'gold',
layout: 'vertical',
label: 'paypal',

},
createOrder: function(data, actions) {
var selectedItemDescription = itemOptions.options[itemOptions.selectedIndex].value;
var selectedItemPrice = parseFloat(itemOptions.options[itemOptions.selectedIndex].getAttribute("price"));
var tax = (12 === 0 || false) ? 0 : (selectedItemPrice * (parseFloat(12)/100));
if(quantitySelect.options.length > 0) {
quantity = parseInt(quantitySelect.options[quantitySelect.selectedIndex].value);
} else {
quantity = 1;
}

tax *= quantity;
tax = Math.round(tax * 100) / 100;
var priceTotal = quantity * selectedItemPrice + parseFloat(shipping) + tax;
priceTotal = Math.round(priceTotal * 100) / 100;
var itemTotalValue = Math.round((selectedItemPrice * quantity) * 100) / 100;

return actions.order.create({
purchase_units: [{
  description: orderDescription,
  amount: {
    currency_code: 'USD',
    value: priceTotal,
    breakdown: {
      item_total: {
        currency_code: 'USD',
        value: itemTotalValue,
      },
      shipping: {
        currency_code: 'USD',
        value: shipping,
      },
      tax_total: {
        currency_code: 'USD',
        value: tax,
      }
    }
  },
  items: [{
    name: selectedItemDescription,
    unit_amount: {
      currency_code: 'USD',
      value: selectedItemPrice,
    },
    quantity: quantity
  }]
}]
});
},
onApprove: function(data, actions) {
return actions.order.capture().then(function(orderData) {

// Full available details
console.log('Capture result', orderData, JSON.stringify(orderData, null, 2));

// Show a success message within this page, e.g.
const element = document.getElementById('paypal-button-container');
element.innerHTML = '';
element.innerHTML = '<h3>Thank you for your payment!</h3>';

// Or go to another URL:  
actions.redirect('https://www.alhuqebi.com/thank_you');

});
},
onError: function(err) {
console.log(err);
},
}).render('#paypal-button-container');
}
initPayPalButton();


const submittedForm = document.getElementById('paypal_form');
//const submitBtn = document.getElementById('registration');
const submitButton = document.getElementById('payNow');
function getToPay(){
var quantity =1;
var itemOptions = document.querySelector("#paypal_form #item-options");
var selectedItemDescription = itemOptions.options[itemOptions.selectedIndex].value;
var selectedItemPrice = parseFloat(itemOptions.options[itemOptions.selectedIndex].getAttribute("price"));
var tax = selectedItemPrice * (parseFloat(12)/100)

tax = Math.round(tax * 100) / 100;
var priceTotal =  selectedItemPrice + tax;
priceTotal = Math.round(priceTotal * 100) / 100;
return {selectedItemDescription: selectedItemDescription,priceTotal:priceTotal}
}
getToPay();

submitButton.addEventListener('click', function(event) {
event.preventDefault(); // Prevent form from submitting

// Build PayPal form and submit it
const paypalForm = document.createElement('form');
paypalForm.action = 'https://www.paypal.com/cgi-bin/webscr';
paypalForm.method = 'post';
paypalForm.target = '_blank';
paypalForm.innerHTML = `
<input type="hidden" name="cmd" value="_xclick">
<input type="hidden" name="business" value="ZA5XSLCNQFWDW">
<input type="hidden" name="item_name" value="${getToPay().selectedItemDescription}">
<input type="hidden" name="amount" value="${getToPay().priceTotal}">
<input type="hidden" name="currency_code" value="USD">
<input type="hidden" name="no_shipping" value="1">
<input type="hidden" name="return" value="https://www.alhuqebi.com/thank_you">
<input type="hidden" name="cancel_return" value="https://www.alhuqebi.com/courses/register">
<input type="hidden" name="notify_url" value="YOUR_IPN_HANDLER_URL">
`;
document.body.appendChild(paypalForm);
paypalForm.submit();

// Submit user form after PayPal submission
submittedForm.submit();
});
document.getElementById("country").setAttribute("style", "border-color: #4d2557;");
   /*document.getElementById('country').getElementsByTagName('option')[2].selected=true;*/
   changePrice();
   function initialValue(){
var itemprice = document.querySelector("#transaction_form #country");
var countryCode = itemprice.options[itemprice.selectedIndex].getAttribute("countryCode");
document.getElementById("phone").value=countryCode; }
   


document.getElementById('phone').value= Session.getActiveUser().getEmail();
initialValue();
chkValue();
var alertShow = document.getElementById('shalert');
function chkValue(){

if (document.getElementById('phone').value==''){
 initialValue();
}

}
function validatePhone(phone) {
let vvaa = /^(\+|\d)[0-9]{11,16}$/;
return vvaa.test(phone);}
  function validateEmail(email) {
let res = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
return res.test(email);
}
function chkEmail() {

var phone = $("#phone");
var phonevalue = $("#phone").val();

var name = $("#name");
  var namealert = $("#namealert");
  var words = name.val().split(' ');
var emailalert = $("#shaler");
var phonealert = $("#shalert");
var email = $("#email");
var one = $("#one").val();
var two = $("#two").val();

emailalert.text("");
phonealert.text("");

if(!isGoogleEmail(email.val())) {
emailalert.text(" يجب عليك ادخال بريدك الكتروني  صالح لأن"+email.val() +" غير مقبول" );
emailalert.css("color", "red");
emailalert.css("width", "100%");
email.css("border-color", "red");
$("#registerButton").attr("disabled", true);
$("#registerButton").css("background", "grey");

} if (!validatePhone(phone.val())){
phonealert.text(" يجب عليك ادخال رقم وتساب بالصيغة الدولية لأن"+phone.val() +" غير صالح" );
phonealert.css("color", "red");
phonealert.css("width", "100%");
phone.css("border-color", "red");
  $("#registerButton").attr("disabled", true);
$("#registerButton").css("background", "grey");
}



if(isGoogleEmail(email.val()) ) {
emailalert.text(email.val() + " يعتبر مقبول");
emailalert.css("color", "blue");
email.css("border-color", "#4d2557");

}
if(validatePhone(phone.val())) {
phonealert.text(phone.val() + " يعتبر مقبول");

phonealert.css("color", "blue");
phonealert.css("width", "100%");
phone.css("border-color", "#4d2557");

}

if ( words.length >=2 && isGoogleEmail(email.val()) && validatePhone(phone.val())) {
//result.text(email.val() + "يعتبر مقبول");
$("#registerButton").attr("disabled", false);
$("#registerButton").css("background", "#4d2557"); 
one = name.val();
two = email.val();
}
return false;
}

function chkName(){
    var name = $("#name");
  var namealert = $("#namealert");
  var words = name.val().split(' ');
  //alert(words.length);
  if (words.length<2){
namealert.text(" يجب عليك ادخال الاسم مع اللقب ");
namealert.css("color", "red");
namealert.css("width", "100%");
name.css("border-color", "red");
  $("#registerButton").attr("disabled", true);
  $("#registerButton").css("background", "grey");
}

if(words.length>1) {
namealert.text("يجب أن تدخل مسافة بين الاسم واللقب ومسافة بعد اللقب");
namealert.css("color", "red");
namealert.css("width", "100%");
name.css("border-color", "red");
}
if(words.length>2) {
var maxlength = name.val().length;
name.attr("maxlength", maxlength);
namealert.text("شكراً لك عزيزي "+name.val() + " يعتبر بهذا الشكل جيد");
namealert.css("color", "green");
namealert.css("width", "100%");
name.css("border-color", "#4d2557");}
}

function isGoogleEmail(email) {
var splitEmail = email.split('@');
var domain = splitEmail[1];

if (domain === 'gmail.com' || domain === 'googlemail.com' || domain === 'alhuqebi.com' || domain === 'yahoo.com' || domain === 'outlook.com' || domain === 'hotmail.com') {
return true;
} else {
return false;
}
}




var email = email.val();
var isGoogle = isGoogleEmail(email);
console.log(isGoogle); // true
var discont = 'no' ;
const discountpercentage = 0.67;
function changePrice(){

    var itemprice = document.querySelector("#transaction_form #service_type");
var prc = parseFloat(itemprice.options[itemprice.selectedIndex].getAttribute("price"));
var code = parseFloat(itemprice.options[itemprice.selectedIndex].getAttribute("code"));

if (discont=='yes'){
   if (code==2 || code==3 || code==23 || code==24){
   prc = prc;
   }else{
      prc = prc * discountpercentage;
   }
   
}
var price = prc+'$';
var getService = itemprice.options[itemprice.selectedIndex].getAttribute("value");
var serviceDetails = itemprice.options[itemprice.selectedIndex].getAttribute("serviceDetails");
var getskills = itemprice.options[itemprice.selectedIndex].getAttribute("skills");
var getoffer = itemprice.options[itemprice.selectedIndex].getAttribute("free");
var itempcountry = document.querySelector("#transaction_form #country");
var countryCode = parseFloat(itempcountry.options[itempcountry.selectedIndex].getAttribute("countryCode"));
var countryName = itempcountry.options[itempcountry.selectedIndex].getAttribute("value");
//var countryName = parseFloat(itemprice.options[itemprice.selectedIndex].value);
document.getElementById('note').value= '';
document.getElementById('serviceName').value= serviceDetails;
document.getElementById('skills').value= getskills;
var discountCode = document.getElementById('dcode').value;
if (getoffer =='yes'){
    price='مجانية';
  document.getElementById('note').value= getService;
}
else if (countryCode==967 || countryCode==963){
     if (code==2 || code==3 || code==23 || code==24){
   prc = prc;
}
else{
     prc = prc * 0.6}
}

price = parseInt(prc, 10) + '$'
document.getElementById("registerButton").textContent='التسجيل الآن'+'-'+price;
document.getElementById('price').value=price;
//\document.getElementById('price').value="95 ريال سعودي";
switch (code) {
 case 1:
document.getElementById('servicePage').href='https://www.alhuqebi.com/courses';
 break;
 case 2:
document.getElementById('servicePage').href='https://www.alhuqebi.com/research';
 break;
 case 3:
document.getElementById('servicePage').href='https://www.alhuqebi.com/research';
 break;
 case 4:
document.getElementById('servicePage').href='https://www.alhuqebi.com/courses/integrated_training_program';
 break;
 case 5:
document.getElementById('servicePage').href='https://www.alhuqebi.com/courses/advanced_production_program';
 break;
 case 6:
document.getElementById('servicePage').href='https://www.alhuqebi.com/courses/PETREL2018';
 break;
 case 7:
document.getElementById('servicePage').href='https://www.alhuqebi.com/courses/gap';
 break;
 case 8:
document.getElementById('servicePage').href='https://www.alhuqebi.com/courses';
 break;
 case 9:
document.getElementById('servicePage').href='https://www.alhuqebi.com/courses';
 break;
 case 10:
document.getElementById('servicePage').href='https://www.alhuqebi.com/courses/techlog';
 break;
 case 11:
document.getElementById('servicePage').href='https://www.alhuqebi.com/courses/ip';
 break;
 case 12:
document.getElementById('servicePage').href='https://www.alhuqebi.com/courses/pipesim';
 break;
 case 13:
document.getElementById('servicePage').href='https://www.alhuqebi.com/courses/solve_production_problems';
 break;
 case 14:
document.getElementById('servicePage').href='https://www.alhuqebi.com/courses/esp';
 break;
 case 15:
document.getElementById('servicePage').href='https://www.alhuqebi.com/courses';
 break;
 case 16:
document.getElementById('servicePage').href='https://www.alhuqebi.com/courses/prosper';
 break;
 case 17:
document.getElementById('servicePage').href='https://www.alhuqebi.com/courses/olga';
 break;
 case 18:
document.getElementById('servicePage').href='https://www.alhuqebi.com/courses/subpump';
 break;
 case 19:
document.getElementById('servicePage').href='https://www.alhuqebi.com/courses/drilling_techonlogy';
 break;
 case 20:
document.getElementById('servicePage').href='https://www.alhuqebi.com/courses/iwcf';
 break;
case 21:
document.getElementById('servicePage').href='https://www.alhuqebi.com/courses';
 break;
case 22:
document.getElementById('servicePage').href='https://www.alhuqebi.com/courses/ramdhan';
 break;
 default:
 document.getElementById('servicePage').href='https://www.alhuqebi.com/courses';
 break;
 }
}



function changeMenue(){
initialValue();
var country=document.getElementById('country').value;
var dispvalue=document.getElementById('payment_method');
if(country=='اليمن')
  document.getElementById('payment_method').getElementsByTagName('option')[1].selected=true;
else if(country=='العراق'){
   document.getElementById('payment_method').getElementsByTagName('option')[10].selected=true;
   document.getElementById("3").style.display = 'block';
   }
else if(country=='الجزائر')
   document.getElementById('payment_method').getElementsByTagName('option')[4].selected=true;
else if(country=='سوريا')
   document.getElementById('payment_method').getElementsByTagName('option')[2].selected=true;
else if(country=='روسيا')
   document.getElementById('payment_method').getElementsByTagName('option')[6].selected=true;
else if(country=='ليبيا')
   document.getElementById('payment_method').getElementsByTagName('option')[5].selected=true;
else if(country=='المملكة العربية السعودية')
   document.getElementById('payment_method').getElementsByTagName('option')[11].selected=true;
else {
document.getElementById('payment_method').getElementsByTagName('option')[7].selected=true;
document.getElementById("3").style.display = 'none';}}
changeMenue()
  getDropDown() 
  function getDropDown(sel){
  hideSome();
  
  
  var country=document.getElementById('country').value;
  if(country=='اليمن'){
      hideAll();
      document.getElementById(sel.options[sel.selectedIndex].value).style.display = 'block';}
  else if(country=='سوريا'){
      hideAll();
      document.getElementById(sel.options[sel.selectedIndex].value).style.display = 'block';}
  else if(country=='روسيا'){
      hideAll();
      document.getElementById(sel.options[sel.selectedIndex].value).style.display = 'block';}
  }

   function hideSome(){
   document.getElementById("0").style.display = 'none';
   document.getElementById("1").style.display = 'none';
   document.getElementById("2").style.display = 'none';
document.getElementById("3").style.display = 'none';
   document.getElementById("4").style.display = 'none';
   document.getElementById("5").style.display = 'none';
   document.getElementById("6").style.display = 'none';
   document.getElementById("7").style.display = 'block';
   document.getElementById("8").style.display = 'block';
   
   }
   function hideAll(){
   document.getElementById("0").style.display = 'none';
   document.getElementById("1").style.display = 'none';
   document.getElementById("2").style.display = 'none';
document.getElementById("3").style.display = 'none';
   document.getElementById("4").style.display = 'none';
   document.getElementById("5").style.display = 'none';
   document.getElementById("6").style.display = 'none';
   document.getElementById("7").style.display = 'none';
   document.getElementById("8").style.display = 'none';
   document.getElementById("10").style.display = 'none';
   document.getElementById("11").style.display = 'none';

   
   }
   
   function showComponent(item){
     document.getElementById("3").style.display = 'block';
     
   }
document.getElementById("d_code").style.display='none';
  function insertValue(){
  if (document.getElementById("radio_4").checked)
  document.getElementById("d_code").style.display='block';
  else
  document.getElementById("d_code").style.display='none';
  }
function startForm(){
  chkEmail();
  chkValue();
  changePrice();
  getDropDown();
  chngBrdr();
  initialValue();
  changeMenue();
  if (document.getElementById('service_type').value == ''){
      document.getElementById("registerButton").disabled = true
  document.getElementById("registerButton").setAttribute("style" , "background:grey")
  }
  if (document.getElementById('country').value == ''){
      document.getElementById("registerButton").disabled = true
  document.getElementById("registerButton").setAttribute("style" , "background:grey")
  }
  else {
      document.getElementById("registerButton").disabled = false;
  document.getElementById("registerButton").setAttribute("style" , "background:#4d2557");
  }

}
changePrice();
const subButtun = document.getElementById('registerButton')
const buttonProgress = document.getElementById('progr')


const scriptURL = 'https://script.google.com/macros/s/AKfycbxrjpqRZO26oPRM0jdOtX_a1b1sFU2iSyZP7ZM7bVQ23uiisWQSLqtKbLXWVBWnbEgF/exec'
const form = document.forms['submit-to-google-sheet']
form.addEventListener('submit', e => {
e.preventDefault()
buttonProgress.textContent='الرجاء الانتظار قليلاً .... جار تسجيل بياناتك';
subButtun.style.display='none';
fetch(scriptURL, { method: 'POST', body: new FormData(form)})
.then(response => { console.log('Success!', response);thankYou();
{$(document).ready(function() 
{ 
$("#myModal").modal('show'); 
}
); }
})
.catch(error => console.error('Error!', error.message))
  })
function thankYou(){
  document.getElementById("paypal_form").style.display='none';
  document.getElementById("progr").style.display='none';
  document.getElementById("confirmation_form").style.display='block';
  document.getElementById("transaction_form").style.display='none';
  document.getElementById("transaction_form").style.display='none';
  document.getElementById("registerButton").style.display='none';
  document.getElementById("registerButton").setAttribute("style", "text-align:center;");
  document.getElementById("elpay").setAttribute("style", "background-color: none;");
  document.getElementById("trpay").setAttribute("style", "background-color: yellow;");
}
            // Get form and submit button
const userForm = document.getElementById('confirmation_form');
//const submitBtn = document.getElementById('registration');
const submitBtn = document.getElementById('modalClose');
//const submitBtn = document.getElementById('registerButton');

//my variables
function getItems(){


var quantity =1;
var itemOptions = document.querySelector("#transaction_form #service_type");
var selectedItemDescription = itemOptions.options[itemOptions.selectedIndex].value;
var selectedItemPrice = parseFloat(itemOptions.options[itemOptions.selectedIndex].getAttribute("price"));
var tax = selectedItemPrice * (parseFloat(12)/100)

tax = Math.round(tax * 100) / 100;
var priceTotal =  selectedItemPrice + tax;
priceTotal = Math.round(priceTotal * 100) / 100;
document.getElementById("three").setAttribute("value",selectedItemDescription);
document.getElementById("four").setAttribute("value",priceTotal);
return {selectedItemDescription: selectedItemDescription,priceTotal:priceTotal}
}
getItems();


//document.getElementById("one").setAttribute("value",getItems().name);
//document.getElementById("two").setAttribute("value",getItems().email);


// Get user input data
/*const fullNameInput = document.getElementById('fullName');
const emailInput = document.getElementById('email');
const amountInput = document.getElementById('amount');*/

// Add event listener to submit button
submitBtn.addEventListener('click', function(event) {
event.preventDefault(); // Prevent form from submitting

// Build PayPal form and submit it
const paypalForm = document.createElement('form');
paypalForm.action = 'https://www.paypal.com/cgi-bin/webscr';
paypalForm.method = 'post';
paypalForm.target = '_blank';
paypalForm.innerHTML = `
<input type="hidden" name="cmd" value="_xclick">
<input type="hidden" name="business" value="ZA5XSLCNQFWDW">
<input type="hidden" name="item_name" value="${getItems().selectedItemDescription}">
<input type="hidden" name="amount" value="${getItems().priceTotal}">
<input type="hidden" name="currency_code" value="USD">
<input type="hidden" name="no_shipping" value="1">
<input type="hidden" name="return" value="https://www.alhuqebi.com/thank_you">
<input type="hidden" name="cancel_return" value="https://www.alhuqebi.com/courses/register">
<input type="hidden" name="notify_url" value="YOUR_IPN_HANDLER_URL">
`;
document.body.appendChild(paypalForm);
paypalForm.submit();

// Submit user form after PayPal submission
userForm.submit();
})
