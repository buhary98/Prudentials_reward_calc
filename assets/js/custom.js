//custom js file

//constants
var assets, jsonData, images, GlobalOptions;
assets = './public/assets/';
jsonData =  assets+'data/';
images =  assets+'images/';
GlobalOptions = "";


// import modules/components
import * as Core from './Core.js';

//For IE workaround fetch api
window.Promise = require("bluebird");
window.Promise.config({
    longStackTraces: true,
    warnings: true // note, run node with --trace-warnings to see full stack traces for warnings
});

import 'whatwg-fetch' ;


/*CUSTOM Javascript ES6*/
(function() {

	//global variable using namespace
	var Data = {};
	//Data.wrap = document.getElementById("wrap").offsetHeight;
	
	//Absolute Url for fetch ajax enquiry
	var getUrl;
	getUrl = window.location.protocol+'//'+window.location.hostname+'/';

	if(Core.isMobile.Android()){
		//$("body").addClass("android");
		Core.addClass(document.querySelector('body'), 'android');
        //document.querySelector('body').style.height = screen.height+"px";
	}

	if(Core.isMobile.iOS()){
		//$("body").addClass("ios");
		Core.addClass(document.querySelector('body'), 'ios');
        //document.querySelector('body').style.height = screen.height+"px";
	}



    /*====================================
	   Read Json Site Contents
    ======================================*/
    function readJson() {
        fetch(jsonData+'fx.json')
        .then(response => {
            if (!response.ok) {
                throw new Error("HTTP error " + response.status);
            }
            return response.json();
        })
        .then(data => {
            // Work with JSON data here
            console.log(data);

            var genericData = data.generic;
            var headernavData = genericData.headernav;
            var fxData = data.fx;
            //var ratingData = data.ratings;

            // Menu data integration
            var jsonmenu = document.querySelector('#jsonmenu'); 

            if (typeof jsonmenu !== "undefined" && jsonmenu) {
                if(headernavData.length>0){   
                         
                    var menuListsFinal = headernavData.map(menu => {
                        var menuLists = '<li><a href="'+menu.link+'" target="'+menu.target+'" class="rcta">'+menu.name+'</a></li>'; 
                        return menuLists;
                    }).join("");
                    
                    jsonmenu.innerHTML += menuListsFinal; 
                }
            }


            //Get HKD CURRENCY VALUE FOR RESULT PAGE SHARES 
            var SharePriceCurrencyHKDValue = document.querySelector('#SharePriceCurrencyHKDValue'); 
            
            if (typeof SharePriceCurrencyHKDValue !== "undefined" && SharePriceCurrencyHKDValue) {
                SharePriceCurrencyHKDValue.value =  genericData.SharePriceCurrencyHKDValue; 
            }  

            // Forex data integration
            var selectCurrency = document.querySelector('#currency');    

            if (typeof selectCurrency !== "undefined" && selectCurrency) {
                if(fxData.length>0){   
                    
                    selectCurrency.innerHTML += '<option selected disabled hidden value="">Select Currency</option>';  

                    var fxFinal = fxData.map(forex => {
                        var fx = '<option value="'+forex.value+'" >'+forex.code+'</option>'; 
                        return fx;
                    }).join("");
                    
                    selectCurrency.innerHTML += fxFinal; 
                }
            }  

            //Forex data for popup modal
            var fxdatacontent = document.querySelector('#fxdatacontent');   
            var fxupdateddate = document.querySelector('#fxupdateddate');   

            if (typeof fxupdateddate !== "undefined" && fxupdateddate) {
                fxupdateddate.innerHTML +=  genericData.FileUpdatedDate; 
            }  

            //Check Forex Data Popup Content 
            if (typeof fxdatacontent !== "undefined" && fxdatacontent) {
                if(fxData.length>0){   
                    
                    fxdatacontent.innerHTML += '';  

                    var fxCFinal = fxData.map(cforex => {
                        var cfx = '<div class="col-12 col-sm-5 bottomline">'+ 
                                    '<span class="name"> '+cforex.code+' </span>'+
                                    '<span class="value"> USD '+cforex.value+' </span>'+
                                  '</div>'; 
                        return cfx;
                    }).join("");
                    
                    fxdatacontent.innerHTML += fxCFinal; 
                }
            }  



             // Ratings data integration for what objectives 1
            /*var selectPrating = document.querySelector('#prating1');    

            if (typeof selectPrating !== "undefined" && selectPrating) {
                    if(ratingData.length>0){   
                        var whatRatingValues = ""; 
                        whatRatingValues += '<option selected disabled hidden value="">Select Rating</option>';  
                             var wrxFinal = ratingData.map(rate => {
                                 var wrx = '<option value="'+rate.value+'" >'+rate.code+'</option>'; 
                                 return wrx;
                             }).join("");
                        whatRatingValues += wrxFinal; 

                        selectPrating.innerHTML = whatRatingValues;
                        console.log("WhatRatingValues");
                    }  
            }  

            // Ratings data integration for how objectives
            var selectHPrating = document.querySelector('#hprating');    

            if (typeof selectHPrating !== "undefined" && selectHPrating) {
                if(ratingData.length>0){   
                    var howRatingValues = ""; 
                    howRatingValues += '<option selected disabled hidden value="">Select Rating</option>';  
                         var hrxFinal = ratingData.map(rate => {
                             var hrx = '<option value="'+rate.value+'" >'+rate.code+'</option>'; 
                             return hrx;
                         }).join("");
                    howRatingValues += hrxFinal; 

                    selectHPrating.innerHTML = howRatingValues;
                    console.log("HowRatingValues");
                }  
            }  
            
             //global options for add more items   
             GlobalOptions = getPerformanceRatingValues(ratingData);
            */

           
           

        })
        .catch(err => {
            // Do something for an error here
            console.log(err);
        });
    }

    function getPerformanceRatingValues(ratingData){
            if(ratingData.length>0){   
                var PerformanceRatingValues = ""; 
                PerformanceRatingValues += '<option selected disabled hidden value="">Select Rating</option>';  
                     var rxFinal = ratingData.map(rate => {
                         var rx = '<option value="'+rate.value+'" >'+rate.code+'</option>'; 
                         return rx;
                     }).join("");
                PerformanceRatingValues += rxFinal; 
            }  
            //console.log(PerformanceRatingValues, "PerformanceRatingValues");
            return PerformanceRatingValues;
    }    

    /*setTimeout(() => 
        console.log(GlobalOptions, "GlobalOptions"),
    150);*/

    
    /*====================================
	   Bonus Calculator
    ======================================*/

     var months = 12;
     var currency, monthlybase, annualbase, fbonus, tallowance, tguaranteedcash;
     var targetaib, aibamount, targetbonus, targetdefferal ;
     var totalvariablepay, targetTcash, targetTcompensation;

     var imultiplier, bmultiplier, cbonus, defferalaward;
     var acutalTvariablepay, actualTcash, actualTcompensation;

     var aibamountUSD, CalcTargetdefferalUSD, acutalTvariablepayUSD, CalcDefferalawardUSD ; 
     var CurrentCurrency, cc, json, currencyCode, currencyValue;
     var fcurrencyValue, fcurrencyCode;

     var Tcondition, Acondition;

    //Update the values in Html
    var annualbasesalaryHtml, tguaranteedcashHtml, aibamountHtml, totalvariablepayHtml,targetTcompensationHtml;
    var acutalTvariablepayHtml, actualTcompensationHtml;
      
     
     // Target Total Compenstation Modelling
     currency = document.getElementById('currency');
     fcurrencyValue = document.getElementById('fcurrencyValue');
     fcurrencyCode = document.getElementById('fcurrencyCode');

     monthlybase = document.getElementById('monthlybase');
     annualbase = document.getElementById('annualbase');

     fbonus = document.getElementById('fbonus');
     tallowance = document.getElementById('tallowance');
     tguaranteedcash = document.getElementById('tguaranteedcash');


     targetaib = document.getElementById('targetaib');
     aibamount = document.getElementById('aibamount');
     targetbonus = document.getElementById('targetbonus');
     targetdefferal = document.getElementById('targetdefferal');


     totalvariablepay = document.getElementById('totalvariablepay');
     targetTcash = document.getElementById('targetTcash');
     targetTcompensation = document.getElementById('targetTcompensation');


     // Actual Total Compenstation Modelling
     imultiplier = document.getElementById('imultiplier');
     bmultiplier = document.getElementById('bmultiplier');
     cbonus = document.getElementById('cbonus');
     defferalaward = document.getElementById('defferalaward');

     acutalTvariablepay = document.getElementById('acutalTvariablepay');
     actualTcash = document.getElementById('actualTcash');
     actualTcompensation = document.getElementById('actualTcompensation');

     Tcondition = document.getElementById('Tcondition');
     Acondition = document.getElementById('Acondition');

    //Update the values in Html
    annualbasesalaryHtml = document.getElementById("annualbasesalaryHtml");

    tguaranteedcashHtml = document.querySelectorAll("#tguaranteedcashHtml");
    aibamountHtml = document.querySelectorAll('#aibamountHtml');
    totalvariablepayHtml = document.getElementById('totalvariablepayHtml'); // Target AIB
    targetTcompensationHtml = document.getElementById('targetTcompensationHtml');

    acutalTvariablepayHtml =  document.querySelectorAll("#acutalTvariablepayHtml");// actual AIB
    actualTcompensationHtml = document.getElementById('actualTcompensationHtml');

    
    function GetCurrentCurrency(currency) {  
        if(currency.value){
            var fxcode = currency.options[currency.selectedIndex].text;
            var fxvalue = currency.options[currency.selectedIndex].value;
            return { fxcode: fxcode , fxvalue : fxvalue  };
        }
        return false; 
    }

    function KeepAllInputValues(){
        /*annualbase.value="" ;
        fbonus.value="" ;
        tallowance.value="" ;
        tguaranteedcash.value="" ;*/

        if(annualbase.value!=""){
            annualbase.value = annualbase.value;
        }

        if(fbonus.value!=""){
            fbonus.value = fbonus.value;
        }

        if(tallowance.value!=""){
            tallowance.value = tallowance.value;
        }

        if(tguaranteedcash.value!=""){
            tguaranteedcash.value = tguaranteedcash.value;
        }


        /*targetaib.value="" ;
        aibamount.value="" ;*/

        if(targetaib.value!=""){
            targetaib.value = targetaib.value;
        }

        if(aibamount.value!=""){
            aibamount.value = aibamount.value;
        }

       
        /*targetbonus.value="" ;
        targetdefferal.value="" ;

        totalvariablepay.value="" ;
        targetTcash.value="" ;
        targetTcompensation.value="" ;*/


        if(targetbonus.value!=""){
            targetbonus.value = targetbonus.value;
        }

        if(targetdefferal.value!=""){
            targetdefferal.value = targetdefferal.value;
        }

        if(totalvariablepay.value!=""){
            totalvariablepay.value = totalvariablepay.value;
        }

        if(targetTcash.value!=""){
            targetTcash.value = targetTcash.value;
        }

        if(targetTcompensation.value!=""){
            targetTcompensation.value = targetTcompensation.value;
        }

       


        // Actual Total Compenstation Modelling
       /*imultiplier.value="" ;
       bmultiplier.value="" ;
       cbonus.value="" ;
       defferalaward.value="" ;*/

        if(imultiplier.value!=""){
            imultiplier.value = imultiplier.value;
        }

        if(bmultiplier.value!=""){
            bmultiplier.value = bmultiplier.value;
        }

        if(cbonus.value!=""){
            cbonus.value = cbonus.value;
        }

        if(defferalaward.value!=""){
            defferalaward.value = defferalaward.value;
        }

        /*acutalTvariablepay.value="" ;
        actualTcash.value="" ;
        actualTcompensation.value="" ;*/


        if(acutalTvariablepay.value!=""){
            acutalTvariablepay.value = acutalTvariablepay.value;
        }

        if(actualTcash.value!=""){
            actualTcash.value = actualTcash.value;
        }

        if(actualTcompensation.value!=""){
            actualTcompensation.value = actualTcompensation.value;
        }


        //html results empty

        /*tguaranteedcashHtml.forEach((data) => {
            data.innerHTML        = ''; 
        });*/ 

        //annualbasesalaryHtml.innerHTML = ''; 

        /*aibamountHtml.forEach((data) => {
            data.innerHTML        = ''; 
        });*/

        //totalvariablepayHtml.innerHTML = '';
        //targetTcompensationHtml.innerHTML = '';

        /*acutalTvariablepayHtml.forEach((data) => {
            data.innerHTML        =  '';
        });*/ 

        //actualTcompensationHtml.innerHTML = '';


    }



    function ClearAllInputValues(){

        currency.selectedIndex = "";

        annualbase.value="" ;
        fbonus.value="" ;
        tallowance.value="" ;
        tguaranteedcash.value="" ;

        targetaib.value="" ;
        aibamount.value="" ;
       
        targetbonus.value="" ;
        targetdefferal.value="" ;

        totalvariablepay.value="" ;
        targetTcash.value="" ;
        targetTcompensation.value="" ;
       


        // Actual Total Compenstation Modelling
        //imultiplier.value="" ;

        if(imultiplier.value!=""){ /* keep this value from PMC*/
            imultiplier.value = imultiplier.value;
        }

        bmultiplier.value="" ;
        cbonus.value="" ;
        defferalaward.value="" ;


        acutalTvariablepay.value="" ;
        actualTcash.value="" ;
        actualTcompensation.value="" ;


        //html results empty
        tguaranteedcashHtml.forEach((data) => {
            data.innerHTML        = ''; 
        }); 

        annualbasesalaryHtml.innerHTML = ''; 

        aibamountHtml.forEach((data) => {
            data.innerHTML        = ''; 
        }); 

        totalvariablepayHtml.innerHTML = '';
        targetTcompensationHtml.innerHTML = '';

        acutalTvariablepayHtml.forEach((data) => {
            data.innerHTML        =  '';
        });

        actualTcompensationHtml.innerHTML = '';


    }



     if(currency){ 
            currency.addEventListener('change', function() {
                //console.log('Currency selected: ', this.value);
                KeepAllInputValues();

                if(currency.value){
                     CurrentCurrency = GetCurrentCurrency(currency);
                     cc = JSON.stringify(CurrentCurrency); 
                     json = JSON.parse(cc);
                     currencyCode  = json.fxcode;
                     currencyValue  = json.fxvalue;
                     console.log(currencyCode + ':' + currencyValue );
                     
                     //insert the currency code in the form
                     var curr_currency = document.querySelectorAll("#curr_currency");
                     curr_currency.forEach((cc) => {
                        cc.innerHTML        =  currencyCode; 
                     }); 

                     fcurrencyCode.value = currencyCode;
                     fcurrencyValue.value = currencyValue;

                     if(annualbase.value!=""){ 
                        InCurrencyChange();  //trigger a calcualtion if the currency changes
                     }

                }
            },false);
     }


     var calcAllTargetValues = () => {
        const percentage = parseFloat(targetaib.value / 100);
            console.log(percentage);
            const aibamountInput = Math.ceil(parseFloat(percentage) * parseInt(+annualbase.value)); 
            aibamount.value = aibamountInput; 

            console.log(aibamountInput, "aibamountInput");

            //convert aibamount to USD
            if(aibamountInput){
                aibamountUSD = Math.floor(parseInt(+aibamountInput) / parseFloat(currencyValue)) ;
                console.log(aibamountUSD + "Target aibamountUSD ");
            }

             // to get the targetdefferal
             //G13 OR F13  = aibamount.value
             /*IF(G13>250000,(86000+(G13-250000)*60%),
             IF(G13>130000,(26000+(G13-130000)*50%),
             IF(AND(G13>65000,(G13-65000)*40%>=6500),(G13-65000)*40%,0)))*/

             if(aibamountUSD > 65000 && aibamountUSD <= 130000){
                const tpercentage = parseFloat(40 / 100);
                console.log(tpercentage);
                const tFormulaeUSD = parseInt(aibamountUSD-65000) * parseFloat(tpercentage);

                if(tFormulaeUSD >=6500){
                    targetdefferal.value = Math.ceil(parseFloat(tFormulaeUSD * currencyValue));
                }else {
                    targetdefferal.value = 0 ;
                }

                Tcondition.value = 'cond40';
                
             }
             else if(aibamountUSD > 130000 && aibamountUSD <= 250000){
                const spercentage = parseFloat(50 / 100);
                console.log(spercentage);
                CalcTargetdefferalUSD = parseInt(26000) + parseFloat(parseInt(aibamountUSD-130000)* parseFloat(spercentage));

                targetdefferal.value =  Math.ceil(parseFloat(CalcTargetdefferalUSD * currencyValue));

                Tcondition.value = 'cond50';
               
             }
             else if(aibamountUSD > 250000){
                const fpercentage = parseFloat(60 / 100);
                console.log(fpercentage);
                CalcTargetdefferalUSD = parseInt(86000) + parseFloat(parseInt(aibamountUSD-250000) * parseFloat(fpercentage));

                targetdefferal.value =  Math.ceil(parseFloat(CalcTargetdefferalUSD * currencyValue)); //(G13 * G3)

                Tcondition.value = 'cond60';
                
             }
             else {
                targetdefferal.value = 0 ;

                Tcondition.value = 'cond0';
               
             }
                
             console.log(targetdefferal.value + "targetdefferalvalue");

               
            targetbonus.value = parseInt(+aibamount.value) - parseInt(+targetdefferal.value);

            totalvariablepay.value = parseInt(+targetbonus.value) + parseInt(+targetdefferal.value);

            targetTcash.value = parseInt(+tguaranteedcash.value) + parseInt(+targetbonus.value);

            targetTcompensation.value = parseInt(+tguaranteedcash.value) + parseInt(+totalvariablepay.value);



            //parseInt(resultJson.tguaranteedcash).toLocaleString();

            //Update the values in Html
            if (typeof currencyCode !== "undefined" && currencyCode) {
                tguaranteedcashHtml.forEach((data) => {
                    data.innerHTML        =  parseInt(tguaranteedcash.value).toLocaleString() + ' '+ currencyCode; 
                }); 

                annualbasesalaryHtml.innerHTML = parseInt(annualbase.value).toLocaleString() + ' '+ currencyCode;

                aibamountHtml.forEach((data) => {
                    data.innerHTML        =  parseInt(aibamount.value).toLocaleString() + ' '+ currencyCode;
                }); 

                totalvariablepayHtml.innerHTML = parseInt(totalvariablepay.value).toLocaleString() + ' '+ currencyCode;
                targetTcompensationHtml.innerHTML = parseInt(targetTcompensation.value).toLocaleString() + ' '+ currencyCode;
            }

             
    }


    var calcAllActualValues = () => {
              const imultiplierPercentage = parseFloat(imultiplier.value / 100);
              console.log(imultiplierPercentage);
      
              const bmultiplierPercentage = parseFloat(bmultiplier.value / 100);
              console.log(bmultiplierPercentage);

              const acutalTvariablepayinputValue = Math.ceil(parseInt(+aibamount.value) * parseFloat(+imultiplierPercentage) * parseFloat(+bmultiplierPercentage)); 
              acutalTvariablepay.value = acutalTvariablepayinputValue; 
              console.log('acutalTvariablepay(actual AIB): ',  acutalTvariablepayinputValue);


             //convert acutalTvariablepayinputValue to USD
             if(acutalTvariablepayinputValue){
                acutalTvariablepayUSD = Math.floor(parseInt(+acutalTvariablepayinputValue) / parseFloat(currencyValue)) ;
                console.log(acutalTvariablepayUSD,  "acutalTvariablepayUSD (actual AIB)");
             }
            

            // to get the defferalaward
            /*G24 OR F24  = acutalTvariablepay.value
            IF(G24>250000,(86000+(G24-250000)*60%),
            IF(G24>130000,(26000+(G24-130000)*50%),
            IF(AND(G24>65000,(G24-65000)*40%>=6500),(G24-65000)*40%,0)))*/
             
            if(acutalTvariablepayUSD > 65000  && acutalTvariablepayUSD <= 130000){
                const tpercent = parseFloat(40 / 100);
                console.log(tpercent);
                const aFormulaeUSD = parseInt(acutalTvariablepayUSD-65000) * parseFloat(tpercent) ;

                console.log(aFormulaeUSD, "under 40%");

                if(aFormulaeUSD >=6500){
                    defferalaward.value = Math.ceil(parseFloat(aFormulaeUSD * currencyValue)); //(G23 * G3) CONVERT TO SELECTED CURRENCY
                }else {
                    defferalaward.value = 0 ;
                }

                Acondition.value = 'cond40';
                
             }
             else if(acutalTvariablepayUSD > 130000 && acutalTvariablepayUSD <= 250000){
                const spercent = parseFloat(50 / 100);
                console.log(spercent);
                CalcDefferalawardUSD = parseInt(26000) + parseFloat(parseInt(acutalTvariablepayUSD-130000) * parseFloat(spercent));
                console.log(CalcDefferalawardUSD, "USD under 50%");

                defferalaward.value =  Math.ceil(parseFloat(CalcDefferalawardUSD * currencyValue)); //(G23 * G3) CONVERT TO SELECTED CURRENCY

                Acondition.value = 'cond50';
             }
             else if(acutalTvariablepayUSD > 250000){
                const fpercent = parseFloat(60 / 100);
                console.log(fpercent);
                
                CalcDefferalawardUSD = parseInt(86000) + parseFloat(parseInt(acutalTvariablepayUSD-250000) * parseFloat(fpercent));
                console.log(CalcDefferalawardUSD, "USD under 60%");

                defferalaward.value =  Math.ceil(parseFloat(CalcDefferalawardUSD * currencyValue)); //(G23 * G3) CONVERT TO SELECTED CURRENCY

                Acondition.value = 'cond60';
             }
             else {
                defferalaward.value = 0 ;

                Acondition.value = 'cond0';
             }

             console.log(defferalaward.value +"defferalvalue");


              cbonus.value = parseInt(+acutalTvariablepay.value) - parseInt(+defferalaward.value); 

              actualTcash.value = parseInt(+tguaranteedcash.value) + parseInt(+cbonus.value);

              actualTcompensation.value = parseInt(+tguaranteedcash.value) + parseInt(+acutalTvariablepay.value);


               //Update the values in Html
               if (typeof currencyCode !== "undefined" && currencyCode) {
                acutalTvariablepayHtml.forEach((data) => {
                    data.innerHTML        =  parseInt(acutalTvariablepay.value).toLocaleString() + ' '+ currencyCode; 
                }); 

                actualTcompensationHtml.innerHTML = parseInt(actualTcompensation.value).toLocaleString() + ' '+ currencyCode;
              }
            
    }


     // Annual Salary Change
     var AnnualSalaryChange = (e) => {
                bcalculator.classList.add('was-validated'); // validations

                //console.log('Annually Base Salary: ', e.target.value);
                //const inputValue = parseInt(e.target.value * months); 
                const inputValue = parseInt(e.target.value); 
                annualbase.value = inputValue; 
                
                //update tguaranteedcash
                if(fbonus || tallowance || annualbase){
                    const inputValue2 = parseInt(inputValue) + parseInt(+fbonus.value) + parseInt(+tallowance.value); 
                    tguaranteedcash.value = inputValue2; 
                }

                // Update all target model values when change the monthly base
                if(targetaib){
                    calcAllTargetValues();
                }

                // Update all Actual model values when change the monthly base
                if(imultiplier || bmultiplier || aibamount){
                    calcAllActualValues();
                }
     }//AnnualSalaryChange


     if(annualbase){ 
        annualbase.addEventListener('input', AnnualSalaryChange, false);
        annualbase.addEventListener('propertychange', AnnualSalaryChange, false); // for IE8
        annualbase.addEventListener('change', AnnualSalaryChange,false); 
    }

    //Fixed bonus and allowance
    var FBAChange = (e) => {
         //handle change
         console.log('FBAChange: ', e.target.value);

         const inputValue = parseInt(+annualbase.value) + parseInt(+fbonus.value) + parseInt(+tallowance.value); 
         tguaranteedcash.value = inputValue; 
         console.log('tguaranteedcash value: ',  inputValue);

           // Add/Update all target and actual model values 
           if(targetaib){
               calcAllTargetValues();
           }

           if(imultiplier || bmultiplier || aibamount){
               calcAllActualValues();
           }
    }

     if(fbonus || tallowance || annualbase){
        document.querySelectorAll('.fba').forEach(item => {
            console.log('FBA: ',  item.value);
            
            if(item){ 
                item.addEventListener('input', FBAChange, false);
                item.addEventListener('propertychange', FBAChange, false); // for IE8
                item.addEventListener('change', FBAChange,false); 
            }

        });
     }


     var TargetAIBChange = (e) => {
        console.log('target aib: ', e.target.value);

        // Add/Update all target model values when change the targetaib
        if(targetaib){
            calcAllTargetValues();
        }

         // Add/Update all Actual model values when change the targetaib
         if(imultiplier || bmultiplier || aibamount){
            calcAllActualValues();
        }
     }

     
     if(targetaib){ 
        targetaib.addEventListener('input', TargetAIBChange, false);
        targetaib.addEventListener('propertychange', TargetAIBChange, false); // for IE8
        targetaib.addEventListener('change', TargetAIBChange,false); 
     }


     // Actual Total Compenstation Modelling
     if(imultiplier || bmultiplier || aibamount){
        document.querySelectorAll('.multiplier').forEach(item => {

            console.log('multiplier: ',  item.value);
            if(item){ 
                item.addEventListener('input', calcAllActualValues, false);
                item.addEventListener('propertychange', calcAllActualValues, false); // for IE8
                item.addEventListener('change', calcAllActualValues,false); 
            }

            /*item.addEventListener('change', event => {
              calcAllActualValues();
            })*/

          });
     }



     var InCurrencyChange = (e) => {
        if(annualbase || fbonus || tallowance ){
            const inputValue = parseInt(+annualbase.value) + parseInt(+fbonus.value) + parseInt(+tallowance.value); 
            tguaranteedcash.value = inputValue; 
            console.log('tguaranteedcash value on change of currency: ',  inputValue);
        }
    
        if(targetaib){
            calcAllTargetValues();
        }
    
        if(imultiplier || bmultiplier || aibamount){
            calcAllActualValues();
        }
     }



    
    
     /*====================================
	   Get Form Data in a Serialize Format
    ======================================*/

     function serialize (form) {
        if (!form || form.nodeName !== "FORM") {
                return;
        }
        var i, j, q = [];
        for (i = form.elements.length - 1; i >= 0; i = i - 1) {
            if (form.elements[i].name === "") {
                continue;
            }
            switch (form.elements[i].nodeName) {
                case 'INPUT':
                    switch (form.elements[i].type) {
                        case 'text':
                        case 'tel':
                        case 'email':
                        case 'hidden': 
                        case 'number': 
                        case 'password':
                        case 'button':
                        case 'reset':
                        case 'submit':
                            q.push(form.elements[i].name + "=" + encodeURIComponent(form.elements[i].value));
                            break;
                        case 'checkbox':
                        case 'radio':
                            if (form.elements[i].checked) {
                                    q.push(form.elements[i].name + "=" + encodeURIComponent(form.elements[i].value));
                            }                                               
                            break;
                    }
                    break;
                    case 'file':
                    break; 
                case 'TEXTAREA':
                        q.push(form.elements[i].name + "=" + encodeURIComponent(form.elements[i].value));
                        break;
                case 'SELECT':
                    switch (form.elements[i].type) {
                        case 'select-one':
                            q.push(form.elements[i].name + "=" + encodeURIComponent(form.elements[i].value));
                            break;
                        case 'select-multiple':
                            for (j = form.elements[i].options.length - 1; j >= 0; j = j - 1) {
                                if (form.elements[i].options[j].selected) {
                                        q.push(form.elements[i].name + "=" + encodeURIComponent(form.elements[i].options[j].value));
                                }
                            }
                            break;
                    }
                    break;
                case 'BUTTON':
                    switch (form.elements[i].type) {
                        case 'reset':
                        case 'submit':
                        case 'button':
                            q.push(form.elements[i].name + "=" + encodeURIComponent(form.elements[i].value));
                            break;
                    }
                    break;
                }
            }
        //return q.join(",");
        return q.join("&");
    }
    


    /*==================================================
	  Form Data to Json Format and display in results
    ===================================================*/

    //Get all form data
    var bcalculator , resultsBtn, aibcalculator,aibcalculatorresults;
       
    bcalculator           =  document.getElementById('bcalculator');
    resultsBtn            =  document.getElementById('results');
    aibcalculator         =  document.getElementById('aibcalculator');
    aibcalculatorresults  =  document.getElementById('aibcalculatorresults');

    // results html elements
    var rcurrencyCode, rcurrencyValue;
    var rtargetTcompensation,rtguaranteedcash,rfbonus,rtallowance,rtotalvariablepay,rtargetTcash, rtargetdefferal,rtargetbonus;
    var rannualbase, rtargetaib, rimultiplier, rbmultiplier, ractualTcompensation,rcbonus,rdefferalaward,racutalTvariablepay,ractualTcash;
    
    var rannualbaseUSD, racutalTvariablepayUSD;

    rcurrencyCode        =  document.querySelectorAll('#rcurrencyCode');

    //target
    rtargetTcompensation =  document.getElementById('rtargetTcompensation');
    rtguaranteedcash     =  document.getElementById('rtguaranteedcash');
    
    rannualbase          =  document.getElementById('rannualbase');
    rannualbaseUSD       =  document.getElementById('rannualbaseUSD');
    
    rfbonus              =  document.getElementById('rfbonus');
    rtallowance          =  document.getElementById('rtallowance');
    rtargetaib           =  document.getElementById('rtargetaib');
    rtotalvariablepay    =  document.getElementById('rtotalvariablepay');
    rtargetTcash         =  document.getElementById('rtargetTcash');
    rtargetdefferal      =  document.getElementById('rtargetdefferal');
    rtargetbonus         =  document.getElementById('rtargetbonus');

    //acutal
    rimultiplier = document.getElementById('rimultiplier');
    rbmultiplier = document.getElementById('rbmultiplier');

    ractualTcompensation =  document.getElementById('ractualTcompensation');
    rcbonus              =  document.getElementById('rcbonus');
    rdefferalaward       =  document.getElementById('rdefferalaward');
    ractualTcash         =  document.getElementById('ractualTcash');
    
    racutalTvariablepay  =  document.getElementById('racutalTvariablepay');
    racutalTvariablepayUSD  =  document.getElementById('racutalTvariablepayUSD');


    //Bonus Deferral Mechanism
    var DBM_rcbonus, DBM_rdefferalaward, DBM_racutalTvariablepay;
    DBM_rcbonus              =  document.getElementById('DBM_rcbonus');
    DBM_rdefferalaward       =  document.getElementById('DBM_rdefferalaward');
    DBM_racutalTvariablepay  =  document.getElementById('DBM_racutalTvariablepay');

    var DBM_USD_rcbonus, DBM_USD_rdefferalaward, DBM_USD_racutalTvariablepay;
    DBM_USD_rcbonus              =  document.getElementById('DBM_USD_rcbonus');
    DBM_USD_rdefferalaward       =  document.getElementById('DBM_USD_rdefferalaward');
    DBM_USD_racutalTvariablepay  =  document.getElementById('DBM_USD_racutalTvariablepay');


    var aib_zero, aib_40, aib_50, aib_60;
    var cbonus_zero, cbonus_40, cbonus_50, cbonus_60;
    var defferalaward_zero, defferalaward_40, defferalaward_50, defferalaward_60, defferalaward_thershold;

    aib_zero     =  document.getElementById('aib_zero');
    aib_40       =  document.getElementById('aib_40');
    aib_50       =  document.getElementById('aib_50');
    aib_60       =  document.getElementById('aib_60');

    cbonus_zero     =  document.getElementById('cbonus_zero');
    cbonus_40       =  document.getElementById('cbonus_40');
    cbonus_50       =  document.getElementById('cbonus_50');
    cbonus_60       =  document.getElementById('cbonus_60');

    defferalaward_zero     =  document.getElementById('defferalaward_zero');
    defferalaward_40       =  document.getElementById('defferalaward_40');
    defferalaward_50       =  document.getElementById('defferalaward_50');
    defferalaward_60       =  document.getElementById('defferalaward_60');
    defferalaward_thershold       =  document.getElementById('defferalaward_thershold');

    //for adding css for ranging
    var active, defferallist, borderzero, borderforty, borderfifty;
    active             =  document.getElementById('active');
    defferallist       =  document.getElementById('defferallist');
    borderzero         =  document.querySelectorAll('#aibintervalsection .zero');
    borderforty        =  document.querySelectorAll('#aibintervalsection .forty');
    borderfifty        =  document.querySelectorAll('#aibintervalsection .fifty');


    // Defferal shared amouts for three years
    var deferralshares, defferalshare_zero, defferalshare_first, defferalshare_second, defferalshare_third;
    deferralshares            =  document.getElementById('deferralshares');
    defferalshare_zero        =  document.getElementById('defferalshare_zero');
    defferalshare_first       =  document.getElementById('defferalshare_first');
    defferalshare_second      =  document.getElementById('defferalshare_second');
    defferalshare_third       =  document.getElementById('defferalshare_third');


    // shares for three years
    var inputshareprices, totalnoofshares , shares_first, shares_second,shares_third;
    inputshareprices          =  document.getElementById('shareprices');
    totalnoofshares           =  document.querySelectorAll('#totalnoofshares');
    shares_first              =  document.getElementById('shares_first');
    shares_second             =  document.getElementById('shares_second');
    shares_third              =  document.getElementById('shares_third');


    function clearShareValues(){
        inputshareprices.value = ' '; //reset the share prices
        
        //totalnoofshares.innerHTML = '';

        totalnoofshares.forEach((data) => {
            data.innerHTML        =  '';
        }); 

        shares_first.innerHTML = '';
        shares_second.innerHTML = '';
        shares_third.innerHTML = '';
    }
    


    /*let number = 1234567890;
    console.log( number.toLocaleString());*/
    
        var resultJson = {};
        if(resultsBtn){
            resultsBtn.addEventListener('click', (e) => {
                e.preventDefault();

                 bcalculator.classList.add('was-validated'); // validations 

                    var error = false;

                    //if (currency.options[currency.selectedIndex].value == "" || currency.options[currency.selectedIndex].value == " ") {
                    if (currency.value == "" || currency.value == " ") {	
                        //Core.show(document.getElementById("err-currency"));
			        	currency.focus();
			            error = true; // change the error state to true
			            return false;
			        }

			        if (annualbase.value == "" || annualbase.value == " ") {
			        	//Core.show(document.getElementById("err-annualbase"));
			        	annualbase.focus();
			            error = true; // change the error state to true
			            return false;
			        }

			        if (targetaib.value == "" || targetaib.value == " ") {
			        	//Core.show(document.getElementById("err-targetaib"));
			        	targetaib.focus();
			            error = true; // change the error state to true
			            return false;
			        }

			        if (imultiplier.value == "" || imultiplier.value == " ") {
			        	//Core.show(document.getElementById("err-imultiplier"));
			        	imultiplier.focus();
			            error = true; // change the error state to true
			            return false;
			        }

			        if (bmultiplier.value == "" || bmultiplier.value == " ") {
			        	//Core.show(document.getElementById("err-bmultiplier"));
			        	bmultiplier.focus();
			            error = true; // change the error state to true
			            return false;
			        }



                if (error == false) { 

                    var formData = serialize(bcalculator); // formdata

                    formData.split('&').forEach(function(value, i, arr){
                        console.log(value);
                        value.split('=').forEach(function(val, i, arr){
                            if(i % 2 === 0) return;
                            const key=arr[i-1].trim().replace("=","");
                            resultJson[key]=val;
                        });
                    });
        
                    //console.log(formData, "formData");
                    console.log(resultJson, "json");
                    //console.log(resultJson.actualTcash, "datajson");
                    //console.log(parseInt(resultJson.actualTcash).toLocaleString(), "stringstonumber");

                    Core.hide(aibcalculator);
                    Core.show(aibcalculatorresults);


                   
                    if(aibcalculatorresults){

                        
                        clearShareValues(); //reset the share prices

                        if(resultJson.currencyCode!="" && resultJson.currencyCode){
                            rcurrencyCode.forEach((cc) => {
                                cc.innerHTML        =  resultJson.currencyCode; 
                            });
                        }

                        if(resultJson.annualbase!="" && resultJson.annualbase && resultJson.currencyCode){
                            rannualbase.innerHTML     = '('+ parseInt(resultJson.annualbase).toLocaleString() + ' ' + resultJson.currencyCode + ')'; //selected currency eg:HKD
                            var annualbaseUSD         =  parseInt(resultJson.annualbase / parseFloat(resultJson.currencyValue)); //Change to USD
                            rannualbaseUSD.innerHTML  =  parseInt(annualbaseUSD).toLocaleString() + ' USD';
                        }

                        //Target section
                        if(resultJson.targetaib!="" && resultJson.targetaib){
                            rtargetaib.innerHTML           =  parseInt(resultJson.targetaib) + '%';
                        }

                        //Actual section
                        if(resultJson.acutalTvariablepay!="" && resultJson.acutalTvariablepay && resultJson.currencyCode){
                            rimultiplier.innerHTML         =  parseInt(resultJson.imultiplier) + '%';
                            rbmultiplier.innerHTML         =  parseInt(resultJson.bmultiplier) + '%';

                            racutalTvariablepay.innerHTML  = '('+  parseInt(resultJson.acutalTvariablepay).toLocaleString() + ' ' + resultJson.currencyCode + ')'; //selected currency eg:HKD;
                            var acutalTvariablepayUSD      =  parseInt(resultJson.acutalTvariablepay / parseFloat(resultJson.currencyValue)); //aib
                            racutalTvariablepayUSD.innerHTML  =  parseInt(acutalTvariablepayUSD).toLocaleString() + ' USD';
                        }


                        // Bonus Deferral Mechanism in selected currency
                        //DBM_racutalTvariablepay.innerHTML  =  parseInt(resultJson.acutalTvariablepay).toLocaleString() + ' ' + resultJson.currencyCode;
                        //DBM_rcbonus.innerHTML              =  parseInt(resultJson.cbonus).toLocaleString() + ' ' + resultJson.currencyCode;
                        //DBM_rdefferalaward.innerHTML       =  parseInt(resultJson.defferalaward).toLocaleString() + ' ' + resultJson.currencyCode;


                        //final value convert to USD
                        var DBM_USD_acutalTvariablepay = parseInt(resultJson.acutalTvariablepay / parseFloat(resultJson.currencyValue)); //aib
                        var DBM_USD_acbonus            = parseInt(resultJson.cbonus / parseFloat(resultJson.currencyValue));
                        var DBM_USD_adefferalaward     = parseInt(resultJson.defferalaward / parseFloat(resultJson.currencyValue));
                        

                        //final values results in USD under Bonus defferal mechanism
                        DBM_USD_racutalTvariablepay.innerHTML  =  DBM_USD_acutalTvariablepay.toLocaleString() +' USD'; //aib
                        DBM_USD_rcbonus.innerHTML              =  DBM_USD_acbonus.toLocaleString() +' USD';
                        DBM_USD_rdefferalaward.innerHTML       =  DBM_USD_adefferalaward.toLocaleString() +' USD';
                        

                        var AcutalCondition  = resultJson.Acondition;
                        console.log(AcutalCondition, "conditions");

                        //values based on which %
                        if(AcutalCondition==='cond0'){
                            aib_zero.innerHTML            = DBM_USD_acutalTvariablepay.toLocaleString() +' USD';
                            cbonus_zero.innerHTML         = DBM_USD_acbonus.toLocaleString() +' USD';
                            defferalaward_zero.innerHTML  = DBM_USD_adefferalaward.toLocaleString() +' USD';
                            defferalaward_thershold.innerHTML  = "Your deferred bonus doesn't meet the minimum of 6,500USD";

                            aib_40.innerHTML  = '';
                            cbonus_40.innerHTML  = '';
                            defferalaward_40.innerHTML  = '';
                            
                            aib_50.innerHTML  = '';
                            cbonus_50.innerHTML  = '';
                            defferalaward_50.innerHTML  = '';

                            aib_60.innerHTML  = '';
                            cbonus_60.innerHTML  = '';
                            defferalaward_60.innerHTML  = '';


                            active.style.width = "44%";
                            defferallist.classList.add('active');
                            active.classList.remove('full'); //for border-radius

                            //borderrightline
                            borderzero.forEach((list) => {
                                list.classList.add('borderright');
                            }); 
                            borderforty.forEach((list) => {
                                list.classList.remove('borderright');
                            }); 
                            borderfifty.forEach((list) => {
                                list.classList.remove('borderright');
                            }); 
                           
                        }

                        if(AcutalCondition==='cond40'){
                            aib_zero.innerHTML            = '65,000 USD';
                            cbonus_zero.innerHTML         = '65,000 USD';
                            defferalaward_zero.innerHTML  = '0 USD';

                           var fotpercent = parseFloat(40 / 100); // for deffered
                           var sixpercent = parseFloat(60 / 100); // for cash bonus

                           var aib_value_40         = parseInt(DBM_USD_acutalTvariablepay-65000);
                           var deffered_value_40    = parseInt(aib_value_40) * parseFloat(fotpercent);
                           var acbonus_value_40     = parseInt(aib_value_40) * parseFloat(sixpercent);

                            aib_40.innerHTML            = aib_value_40.toLocaleString() +' USD';
                            //cbonus_40.innerHTML         = acbonus_value_40.toLocaleString() +' USD';
                            //defferalaward_40.innerHTML  = deffered_value_40.toLocaleString() +' USD';

     
                            //checking with total AIB
                            if(DBM_USD_acutalTvariablepay>=81250){
                                cbonus_40.innerHTML         = acbonus_value_40.toLocaleString() +' USD';
                                defferalaward_40.innerHTML  = deffered_value_40.toLocaleString() +' USD';
                                defferalaward_thershold.innerHTML  = "";
                            } else{
                                cbonus_40.innerHTML         = aib_value_40.toLocaleString() +' USD';
                                defferalaward_40.innerHTML  = '0 USD';
                                defferalaward_thershold.innerHTML  = "Your deferred bonus doesn't meet the minimum of 6,500USD";
                            }


                            aib_50.innerHTML  = '';
                            cbonus_50.innerHTML  = '';
                            defferalaward_50.innerHTML  = '';

                            aib_60.innerHTML  = '';
                            cbonus_60.innerHTML  = '';
                            defferalaward_60.innerHTML  = '';


                            
                            active.style.width = "62%";
                            defferallist.classList.add('active');
                            active.classList.remove('full'); //for border-radius

                            //borderrightline
                            borderzero.forEach((list) => {
                                list.classList.add('borderright');
                            }); 
                            borderforty.forEach((list) => {
                                list.classList.add('borderright');
                            }); 
                            borderfifty.forEach((list) => {
                                list.classList.remove('borderright');
                            }); 

                        }

                        if(AcutalCondition==='cond50'){
                            aib_zero.innerHTML            = '65,000 USD';
                            cbonus_zero.innerHTML         = '65,000 USD';
                            defferalaward_zero.innerHTML  = '0 USD';
                            
                            aib_40.innerHTML            = '65,000 USD';
                            cbonus_40.innerHTML         = '39,000 USD';  //65000 * 60%
                            defferalaward_40.innerHTML  = '26,000 USD';  // 65000 * 40%

                           var fiftypercent = parseFloat(50 / 100); // for deffered and for cash bonus

                           var aib_value_50        = parseInt(DBM_USD_acutalTvariablepay-130000);
                           var deffered_value_50   = parseInt(aib_value_50) * parseFloat(fiftypercent);
                           var acbonus_value_50    = parseInt(aib_value_50) * parseFloat(fiftypercent);


                            aib_50.innerHTML            = aib_value_50.toLocaleString() +' USD';
                            cbonus_50.innerHTML         = acbonus_value_50.toLocaleString() +' USD';
                            defferalaward_50.innerHTML  = deffered_value_50.toLocaleString() +' USD';
                            defferalaward_thershold.innerHTML  = "";

                            aib_60.innerHTML  = '';
                            cbonus_60.innerHTML  = '';
                            defferalaward_60.innerHTML  = '';


                           
                            active.style.width = "80%";
                            defferallist.classList.add('active');
                            active.classList.remove('full'); //for border-radius


                            //borderrightline
                            borderzero.forEach((list) => {
                                list.classList.add('borderright');
                            }); 
                            borderforty.forEach((list) => {
                                list.classList.add('borderright');
                            }); 
                            borderfifty.forEach((list) => {
                                list.classList.add('borderright');
                            }); 
                           
                        }

                        if(AcutalCondition==='cond60'){
                            aib_zero.innerHTML             = '65,000 USD';
                            cbonus_zero.innerHTML          = '65,000 USD';
                            defferalaward_zero.innerHTML   = '0 USD';

                            aib_40.innerHTML            = '65,000 USD';
                            cbonus_40.innerHTML         = '39,000 USD';  //65000 * 60%
                            defferalaward_40.innerHTML  = '26,000 USD';  // 65000 * 40%

                            aib_50.innerHTML            = '120,000 USD';
                            cbonus_50.innerHTML         = '60,000 USD';  //120000 * 50%
                            defferalaward_50.innerHTML  = '60,000 USD';  //120000 * 50%

                            
                           var dsixpercent = parseFloat(60 / 100);  // for deffered 
                           var cfotpercent = parseFloat(40 / 100);  // for cash bonus

                           var aib_value_60         = parseInt(DBM_USD_acutalTvariablepay-250000);
                           var deffered_value_60    = parseInt(aib_value_60) * parseFloat(dsixpercent);
                           var acbonus_value_60     = parseInt(aib_value_60) * parseFloat(cfotpercent);


                            aib_60.innerHTML            = aib_value_60.toLocaleString() +' USD';
                            cbonus_60.innerHTML         = acbonus_value_60.toLocaleString() +' USD';
                            defferalaward_60.innerHTML  = deffered_value_60.toLocaleString() +' USD';

                            defferalaward_thershold.innerHTML  = "";


                            active.style.width = "100%";
                            defferallist.classList.add('active');
                            active.classList.add('full'); //for border-radius


                            //borderrightline
                            borderzero.forEach((list) => {
                                list.classList.add('borderright');
                            }); 
                            borderforty.forEach((list) => {
                                list.classList.add('borderright');
                            }); 
                            borderfifty.forEach((list) => {
                                list.classList.add('borderright');
                            }); 

                        }


                        //shares code 
                        if(DBM_USD_adefferalaward > 0){
                            Core.show(deferralshares);

                            //USD 
                            var sharesUSD = Math.fround(parseFloat(DBM_USD_adefferalaward / 3));
                            var oneShareUSD = sharesUSD.toLocaleString() +' USD';

                            //CONVERT USD TO HKD  
                            //var HKDcurrencyValue = 7.757600;
                            var HKDcurrencyValue = document.getElementById('SharePriceCurrencyHKDValue').value; 
                            console.log(HKDcurrencyValue, "HKDcurrencyValue");

                            var DBM_HKD_adefferalaward  = Math.ceil(parseFloat(DBM_USD_adefferalaward * HKDcurrencyValue)); 
                            
                            //HKD
                            var sharesHKD = Math.fround(parseFloat(DBM_HKD_adefferalaward / 3));
                            var oneShareHKD = sharesHKD.toLocaleString() + ' HKD';

                            //selected currency
                            var sharesOth = Math.fround(parseFloat(resultJson.defferalaward / 3));
                            var oneShareOth = sharesOth.toLocaleString() + ' ' + resultJson.currencyCode;


                            var fullShareUSD = DBM_USD_adefferalaward.toLocaleString() +' USD';
                            var fullShareHKD = DBM_HKD_adefferalaward.toLocaleString() +' HKD';
                            var fullShareOth = parseInt(resultJson.defferalaward).toLocaleString() + ' ' + resultJson.currencyCode; //Selected currency

                            defferalshare_zero.innerHTML   = fullShareUSD +' / '+fullShareHKD;
                            defferalshare_first.innerHTML  = oneShareUSD +' / '+oneShareHKD;
                            defferalshare_second.innerHTML = oneShareUSD +' / '+oneShareHKD;
                            defferalshare_third.innerHTML  = oneShareUSD +' / '+oneShareHKD;


                            //SharePricesChange
                            var SharePricesChange = (e) => {
                                    console.log('share prices: ', e.target.value);
                                    var inputShareVlaue = e.target.value;

                                    /* for shares must use HKD currency values */
                                    var NumberOfShares = Math.fround(parseFloat(DBM_HKD_adefferalaward / inputShareVlaue)).toFixed(2);
                                    NumberOfShares = NumberOfShares.toLocaleString();

                                    var eachYearShares = Math.fround(parseFloat(NumberOfShares / 3)).toFixed(2) ;
                                    eachYearShares = eachYearShares.toLocaleString();

                                    //totalnoofshares.innerHTML =  NumberOfShares;
                                if(inputShareVlaue!=="" && NumberOfShares>0){
                                    totalnoofshares.forEach((data) => {
                                        data.innerHTML        =  NumberOfShares
                                    }); 

                                    shares_first.innerHTML = eachYearShares+' Shares';
                                    shares_second.innerHTML = eachYearShares+' Shares';
                                    shares_third.innerHTML = eachYearShares+' Shares';
                                }else {
                                    clearShareValues();
                                }
                                    
                            }//SharePricesChange


                            if(inputshareprices){
                                inputshareprices.addEventListener('input', SharePricesChange, false);
                                inputshareprices.addEventListener('propertychange', SharePricesChange, false); // for IE8
                                inputshareprices.addEventListener('change', SharePricesChange,false); 
                            }

                        } else{
                            Core.hide(deferralshares);
                        }

                        
                       
                    }

                }

           });
        }
  
    


    /*====================================
	   Show the Bonus Calculator Form
    ======================================*/
    var pmcalculatorpage, aibcpage, backtobc, gotobc, backtopmc, fnext, OverBtnBacktobc;

     pmcalculatorpage = document.getElementById('pmcalculatorpage');
     aibcpage = document.getElementById('aibcpage');

     backtobc = document.getElementById('backtobc');
     backtopmc = document.getElementById('backtopmc');

     OverBtnBacktobc = document.getElementById('OverBtnBacktobc');

     gotobc = document.getElementById('gotobc');
     fnext =  document.getElementById('fnext');

    if(backtobc){ /* back to bonus calculator */ 
            backtobc.addEventListener('click', (e) => {
                e.preventDefault();
                Core.hide(aibcalculatorresults);
                Core.show(aibcalculator);             
            });
    }

    if(backtopmc){ /* back to performance calculator */
        backtopmc.addEventListener('click', (e) => {
            e.preventDefault();
            Core.show(pmcalculatorpage);
            Core.hide(aibcpage);             
        });
    }


    if(OverBtnBacktobc){ /* back to bonus calculator */
        OverBtnBacktobc.addEventListener('click', (e) => {
            e.preventDefault();
            Core.hide(aibcalculatorresults);
            Core.show(aibcalculator);  
            ClearAllInputValues(); // clear all input values from bonus calculator        
        });
    }


    if(gotobc){
        gotobc.addEventListener('click', (e) => {
            e.preventDefault();

            //overall % fields
            var whatpercentage =  document.getElementById('whatpercentage');
            var howpercentage =  document.getElementById('howpercentage');

            // how score fields
            var hweighting =  document.getElementById('hweighting');
            var hprating = document.getElementById('hprating');

            var error = false;

                    if (whatpercentage.value == "" || whatpercentage.value == " ") {	
                        //Core.show(document.getElementById("err-whatpercentage"));
			        	whatpercentage.focus();
			            error = true; // change the error state to true
			            return false;
			        }

			        if (howpercentage.value == "" || howpercentage.value == " ") {
			        	//Core.show(document.getElementById("err-howpercentage"));
			        	howpercentage.focus();
			            error = true; // change the error state to true
			            return false;
			        }

			        if (hweighting.value == "" || hweighting.value == " ") {
			        	//Core.show(document.getElementById("err-hweight"));
			        	hweighting.focus();
			            error = true; // change the error state to true
			            return false;
			        }

			        if (hprating.value == "" || hprating.value == " ") {
			        	//Core.show(document.getElementById("err-hrating"));
			        	hprating.focus();
			            error = true; // change the error state to true
			            return false;
			        }


                if (error == false) { 
                    Core.hide(pmcalculatorpage);
                    Core.show(aibcpage); 
                }

                       
        });
    }

    
    

    /*====================================
	   Performance Management Calculator
    ======================================*/
     var ngoals, Options, addrows, fdiv, ArrayRid;

     ArrayRid = new Array();

     fdiv = document.getElementById('formcotnent');

     ngoals = 10; //document.getElementById('ngoals');
     
     addrows = document.getElementById('addrows');
    
     Options = '<option selected disabled hidden value="">Select Rating</option>'+ 
                '<option value="0.00">Needs Improvement (0.00)</option>'+ 
                '<option value="0.95">Effective (0.95)</option>'+ 
                '<option value="1.15">Highly Effective (1.15)</option>'+ 
                '<option value="1.40">Outstanding (1.40)</option>';

     const inputHandler = function(e) {

        //console.log('number of goals: ', this.value);
        //console.log('number of goals:', e.target.value);
        //var goals =  this.value;

        var goals = 5;
        var dcontent = ' ';

        if (typeof goals !== "undefined" && goals) {

            for(var i=2; i<=goals; i++){
                dcontent +='<div id="rowgoals'+i+'">';
                
                        dcontent +='<div class="mb-3 row">'+
                                '<div class="col-1">'+
                                    //'<input type="button" value="-" class="deleterow" dataid='+i+' id="deleterow'+i+'">'+
                                    '<img src="'+images+'minus.png" class="deleterow img-responsive" dataid='+i+' id="deleterow'+i+'" />'+
                                '</div>'+
                                '<div class="col-3">'+
                                    '<input type="text" class="form-control goals" id="igoals'+i+'"  placeholder="" value="Objective '+i+'" />'+
                                '</div>'+
                                '<div class="col-2">'+
                                    '<input type="number" min="1" max="100" class="form-control weight" id="weighting'+i+'"  placeholder="Enter Weighting" value="" required/>'+
                                    '<label class="percent">%</label>'+
                                    '<div class="invalid-feedback" id="err-weight">Weight is empty!</div>'+
                                '</div>'+
                                '<div class="col-4">'+
                                    '<select class="form-select prating" id="prating'+i+'" required>'+
                                        Options+
                                    '</select>'+
                                    '<div class="invalid-feedback" id="err-prating">Please select your rating</div>'+
                                '</div>'+
                                '<div class="col-2 textcenter">'+
                                    '<input type="number" class="form-control calc score" id="score'+i+'" readonly  value="" /><label class="spercent">%</label>'+
                                '</div>'+
                            '</div>';

                dcontent +='</div>';
            }

        } 
        
        if (typeof fdiv !== "undefined" && fdiv!='' && fdiv) {
            fdiv.innerHTML = dcontent; 
        }
            
    }


    function roundToNearest(numToRound, numToRoundTo) {
        return Math.round(numToRound / numToRoundTo) * numToRoundTo;
    }

    function removeItemOnce(arr, value) {
        var index = arr.indexOf(value);
        if (index > -1) {
          arr.splice(index, 1);
        }
        return arr;
    }

    function sortChildren(parent, comparator) {
        parent.replaceChildren(...Array.from(parent.children).sort(comparator));
    }


    function WhatScore(){
         //what score
         var weightPercentage = 0; 
         var prvalue = 0.00;

         var weight =  document.querySelectorAll('.weight');
         var prating = document.querySelectorAll('.prating');
         var allscores = document.querySelectorAll('.score');
         
         if(weight.length>0 || prating.length>0){
             
            Array.prototype.forEach.call (weight, function (witem, index) {
             //weight.forEach((witem, index) => {

                if(witem){
                    witem.addEventListener('input', event => {

                        var count = index + 1;
                        var weighting =  document.getElementById('weighting'+count);

                        if(weighting!=""){
                            weightPercentage = parseFloat(weighting.value / 100);
                        }else{
                            weightPercentage = 0; 
                        }
    
                        console.log(weightPercentage, 'weight percentage'+count);
                        //handle change
                        //console.log(weighting.value , witem.value);

                        var pratingItem = document.getElementById('prating'+count);

                        if(pratingItem!=""){
                            prvalue = pratingItem.options[pratingItem.selectedIndex].value;
                        } else{
                            prvalue = 0.00;
                        }

                        /*if(!prvalue){
                            prvalue = 0.00;
                        }*/
                        
                       
                        var inputValue =  parseFloat(weightPercentage * prvalue); 
                        var inputValuetoPercent = parseFloat(inputValue * 100) ; // convert to percentage
                        //var inputValueRound = Math.fround(inputValuetoPercent);

                        var score =  document.getElementById('score'+count);
                        if(score!=""){
                            score.value = inputValuetoPercent.toFixed(2);  //roundToNearest(inputValuetoPercent, 5);
                        }else {
                            score.value = 0.00;
                        }

                        console.log('AB score of each goals: ',  inputValue);    
                       
                        //totalwhatscore
                        if(allscores){
                            FtotalWhatScore (allscores);
                            overallPerformace();
                        }

                        // make this values empty
                        //overallPerformaceValueEmpty();
                    })
                }
               
            });

             //prating.forEach((pitem, pindex) => {
             Array.prototype.forEach.call (prating, function (pitem, pindex) {

                if(pitem){
                    pitem.addEventListener('change', event => {

                        var pcount = pindex + 1;
                        var pratingItem=  document.getElementById('prating'+pcount);

                        if(pratingItem!=""){
                            prvalue = pratingItem.options[pratingItem.selectedIndex].value;
                        } else{
                            prvalue = 0.00;
                        }
                        
                        //var testprvalue = pitem.options[pitem.selectedIndex].value;
                        //handle change
                        console.log('prvalue',  prvalue);

                        var weighting =  document.getElementById('weighting'+pcount);

                        if(weighting!=""){
                            weightPercentage = parseFloat(weighting.value / 100);
                        }else{
                            weightPercentage = 0;
                        }
                       

                        /*if(!weightPercentage){
                                weightPercentage = 0;
                        }*/

                        console.log(weightPercentage, 'weight percentage'+pcount);


                        const PinputValue =  parseFloat(weightPercentage * prvalue); 
                        var PinputValuetoPercent = parseFloat(PinputValue * 100) ; // convert to percentage
                        //var PinputValueRound = Math.fround(PinputValuetoPercent);

                        var pscore =  document.getElementById('score'+pcount);
                        if(pscore!=""){
                            pscore.value = PinputValuetoPercent.toFixed(2);  //roundToNearest(PinputValuetoPercent, 5);
                        } else {
                            pscore.value = 0.00;
                        }

                        console.log('AB score of each goals: ',  PinputValue); 
                        
                            //totalwhatscore
                            if(allscores){
                                FtotalWhatScore (allscores);
                                overallPerformace();
                            }

                            // make this values empty
                            //overallPerformaceValueEmpty();
                        
                    })
                }
                

             });

         }

    }


    function FtotalWhatScore (allscores) {
        //totalwhatscore
        if(allscores.length>0){
            var sum = 0;
            var ascores = 0;

            var sumweight = 0;
            var aweightage = 0;

            //allscores.forEach((sitem, sindex) => {
            Array.prototype.forEach.call (allscores, function (sitem, sindex) {
                //console.log(sitem.value, "first value");

                var scount = sindex + 1;
                var eachScore =  document.getElementById('score'+scount);
                var eachWeight =  document.getElementById('weighting'+scount);


                /*var eachPrating=  document.getElementById('prating'+scount);
                if(eachPrating){
                    var rvalue = eachPrating.options[eachPrating.selectedIndex].value;
                    console.log(rvalue + " rvalue");
                }*/

                if(eachScore){
                    ascores = parseFloat(+eachScore.value);
                    sum = sum + ascores; // what score total 
                    console.log(ascores + " ascores");
                }
               
                if(eachWeight){
                    aweightage = parseInt(+eachWeight.value);
                    sumweight = sumweight + aweightage; // what score weight total percentage
                    console.log(aweightage + " aweightage");
                }

                console.log("debug-test" , allscores.length);

                console.log(eachScore);
                console.log(eachWeight);
                
            });

         


            var pcalculator =  document.getElementById('pcalculator'); //form pmc
            pcalculator.classList.add('was-validated'); // validations  
   

            var wtotal =  document.getElementById('wtotal');   
            var twscore =  document.getElementById('twscroe'); // htmlelement
            var fwtscore =  document.getElementById('fwtscore');  // hidden input

            var fwtsumweight =  document.getElementById('fwtsumweight');  // hidden input

            //var howscoresection = document.getElementById('howscoresection');
            //var overperformance =  document.getElementById('overperformance'); 

            var whatpercent =  document.getElementById('whatpercentage');
            var errweightage = document.getElementById("err-weightage"); //sum of weightage

            console.log(sum.toFixed(2)+ " suming");
            console.log(sumweight + " sumweight");

            if(sumweight < 100 || sumweight > 100){
                Core.show(errweightage);

                Core.hide(wtotal);
                twscore.innerHTML = ''; 
                fwtscore.value = 0; // hidden input

                fwtscore.value = 0; // hidden input
                fwtsumweight.value = sumweight; // hidden input

                //Core.hide(howscoresection);
                console.log("<100 >100");

            } else if(sumweight === 100){
                Core.hide(errweightage);

                Core.showflex(wtotal);
                sum = sum.toFixed(2);
                twscore.innerHTML = sum+'%';  //to show in html
                fwtscore.value = sum;  // hidden input value 

                fwtsumweight.value = sumweight; // hidden input
                //Core.show(howscoresection);
                console.log("==100");
            }


          

        }
    }

    function HowScore(){
        //how score fields
        var hweight =  document.getElementById('hweighting');
        var hprating = document.getElementById('hprating');
        var hscore =  document.getElementById('hscore'); 

        // outputs
        var htotal =  document.getElementById('htotal');   
        var hfscroe =  document.getElementById('hfscroe');  
        //var overperformance =  document.getElementById('overperformance'); 

        var hweightPercentage = 0; 
        var hrvalue = 0.00;
        var HinputValue;
        
        if(hprating || hweight){

            hweight.addEventListener('input', event => {
                
                    hweightPercentage = parseFloat(hweight.value / 100);
                    hrvalue = hprating.options[hprating.selectedIndex].value;

                    if(!hrvalue){
                        hrvalue = 0.00;
                    }

                    console.log('hrvalue:',  hrvalue);

    
                    HinputValue =  parseFloat(hweightPercentage * hrvalue);   
                    var hvaluepercent  = parseFloat(HinputValue * 100); // convert to percentage
                    var hvalround = Math.fround(hvaluepercent);

                    hscore.value =  hvalround;  //roundToNearest(hvaluepercent, 5); 
                    console.log('AB score of how score goals: ',  HinputValue);
        
                    if(HinputValue > 0){
                        Core.showflex(htotal);
                        hfscroe.innerHTML = hvalround+'%'; 
                        //Core.show(overperformance);
                    }
                    
                    //calculate overall
                    overallPerformace();

                    // make this values empty
                    //overallPerformaceValueEmpty();

            });

            hprating.addEventListener('change', event => {

                    hrvalue = hprating.options[hprating.selectedIndex].value;
                    hweightPercentage = parseFloat(hweight.value / 100);
    
                    console.log('hrvalue:',  hrvalue);

                    if(!hweightPercentage){
                        hweightPercentage = 0;
                    }
            
                    HinputValue =  parseFloat(hweightPercentage * hrvalue);   
                    var hrvaluepercent  = parseFloat(HinputValue * 100); // convert to percentage
                    var hrvalround = Math.fround(hrvaluepercent);

                    hscore.value =  hrvalround;  //roundToNearest(hrvaluepercent, 5);
                    console.log('AB score of how score goals: ',  HinputValue);
        
                    if(HinputValue > 0){
                        Core.showflex(htotal);
                        hfscroe.innerHTML = hrvalround+'%'; 
                        //Core.show(overperformance);
                    }
                    
                    //calculate overall
                    overallPerformace();

                // make this values empty
                //overallPerformaceValueEmpty();

                
            });
        }
        
    }

    function overallPerformace(){
        var overperformance =  document.getElementById('overperformance'); 

        // how score fields
        var hweighting =  document.getElementById('hweighting');
        var hprating = document.getElementById('hprating');

        var whatpercentage =  document.getElementById('whatpercentage');
        var howpercentage =  document.getElementById('howpercentage');

        var fwtscore =  document.getElementById('fwtscore');  //hidden field
        var fwtsumweight =  document.getElementById('fwtsumweight');  // hidden input what total sum of weight
        var hscore =  document.getElementById('hscore');

    

        var twscoreHtml =  document.getElementById('twscoreHtml');  
        var hfscoreHtml =  document.getElementById('hfscoreHtml');

        var wpercentHtml =  document.getElementById('wpercentHtml');  
        var hpercentHtml =  document.getElementById('hpercentHtml');

        var finalResultsHtml =  document.getElementById('finalResultsHtml');  
        var ratingMHtml =  document.getElementById('ratingMHtml');
        var individualMHtml =  document.getElementById('individualMHtml');


        var ratings="" ;
        var overAllPercentage = 0 ;
        var overAllRating = 0;
        var sumWeightTotal = 0;

        var erroverallweightage = document.getElementById("err-overallweightage");

        if((whatpercentage.value!="" && howpercentage.value!="") && (hscore.value!="" && fwtscore.value!="" && fwtsumweight.value!="")){

            //console.log(overAllPercentage + " overAllPercentage test");  

            overAllPercentage = parseInt(+whatpercentage.value) +  parseInt(+howpercentage.value);

            sumWeightTotal = parseInt(+fwtsumweight.value);
            
            console.log(overAllPercentage + " overAllPercentage new");  

                    var  FwhatPercentage = parseFloat(whatpercentage.value / 100);
                    var  Fhowpercentage = parseFloat(howpercentage.value / 100);

                    //convert the final score to normal decimal values based on formulae
                    var  Fwhatscore = parseFloat(fwtscore.value / 100);
                    var  Fhowscore = parseFloat(hscore.value / 100);

                    // overall  (1.10 x 70% = 0.77) + (0.95 x 30% = 0.285)
                    overAllRating  = parseFloat(Fwhatscore * FwhatPercentage) + parseFloat(Fhowscore * Fhowpercentage);
                    //console.log(overAllRating + " overAllRating");   


                    if(overAllRating >= 0.80  && overAllRating <= 1.09){
                        ratings = 'Effective'; 
                    } else if(overAllRating >= 1.09  && overAllRating <= 1.29){
                        ratings = 'Highly Effective'; 
                    } else if(overAllRating >= 1.29  && overAllRating <= 1.50){
                        ratings = 'Outstanding'; 
                    } else if(overAllRating < 0.80){
                        ratings = 'Needs Improvement'; 
                    } else{
                        ratings = 'No Rating'; 
                    }

            
                    var RIndividualMultiplier = parseFloat(overAllRating * 100).toFixed(2);
                    var FIndividualMultiplier = roundToNearest(RIndividualMultiplier, 5);  //round of with nearest 5
                    
                    console.log(sumWeightTotal,"sumWeightTotal");

                    if(overAllRating>0 && hweighting.value!="" && hprating.value!=""  && sumWeightTotal===100 && overAllPercentage===100){
                        Core.show(overperformance);
                       
                        twscoreHtml.innerHTML = fwtscore.value+'%' ; 
                        hfscoreHtml.innerHTML = hscore.value +'%'; 
                        wpercentHtml.innerHTML = whatpercentage.value+'%' ; 
                        hpercentHtml.innerHTML = howpercentage.value+'%' ; 

                        finalResultsHtml.innerHTML  = RIndividualMultiplier+'%' ; 
                        ratingMHtml.innerHTML = ratings ; 
                        individualMHtml.innerHTML = FIndividualMultiplier+'%' ; 

                        imultiplier.value = FIndividualMultiplier; // update the compensation form individual multiplier

                        Core.show(fnext);
                        Core.hide(erroverallweightage);    
                    } else {
                        Core.hide(overperformance);
                        Core.hide(fnext);
                        Core.show(erroverallweightage);

                        twscoreHtml.innerHTML = ''; 
                        hfscoreHtml.innerHTML = ''; 
                        wpercentHtml.innerHTML = '' ; 
                        hpercentHtml.innerHTML = '' ; 
                        finalResultsHtml  = '' ; 
                        ratingMHtml = '' ; 
                        individualMHtml = '' ; 
                    }
                    
        } 

       
    }


        var whpercentage = document.querySelectorAll('.whpercentage');
        if(whpercentage.length>0){
            whpercentage.forEach(item => {
                /*item.addEventListener('change', event => {
                    console.log('on change: ',  item.value);
                    overallPerformace();
                });*/

               
                if(item){ 
                    item.addEventListener('input', overallPerformace, false);
                    item.addEventListener('propertychange', overallPerformace, false); // for IE8
                    item.addEventListener('change', overallPerformace,false); 
                }

            });
        }


        function pmCalc(){
            WhatScore();
            HowScore();
            overallPerformace();
        }
    
    
        function removeRow (deleterow, rowgoals, rid) {
            if(deleterow){
                deleterow.parentNode.removeChild(deleterow);   //element.parentNode.removeChild(element);
                rowgoals.remove();
                
                //sort the div after removing rows
                sortChildren(fdiv, (a, b) => +a.id.match( /\d+/ ) - +b.id.match( /\d+/ )); 
            }
    
           pmCalc(); //run full calculation
    
          //update totalwhatscore and overall performance update after removing goals
          var allwhatscores = document.querySelectorAll('.score');  
    
          if(allwhatscores){
                FtotalWhatScore (allwhatscores);
                overallPerformace();
                console.log("new test");
           }
    
            rid = parseInt(rid);
            console.log(rid, "ridchangetonumber");
    
            if(!ArrayRid.includes(rid)){
                ArrayRid.push(rid);
            }
    
            console.log(ArrayRid,"ArrayRid");
    
            //show/hide add goals
            var addgoals = document.getElementById("addgoals");
            if(rid<=ngoals){
                Core.show(addgoals);
            } else {
                Core.hide(addgoals);
            } 
    
        }
    
        function deleteRowItem(){
            var deleterows =  document.querySelectorAll('.deleterow');
           
            if(deleterows.length>0){
                //deleterows.forEach((ditem, index) => {
                Array.prototype.forEach.call (deleterows, function (ditem, index) {
                    ditem.addEventListener('click', event => {
        
                       var rid = ditem.getAttribute("dataid");
                       console.log(rid  + " dataid");
                       console.log(typeof(rid), " type testing ");
                       var deleterowItems = document.getElementById('deleterow'+rid);               
                       var rowgoals = document.getElementById('rowgoals'+rid);
    
                       //remove rows one by one based on rid
                       removeRow(deleterowItems, rowgoals, rid);
                       
                    })
                });
            }
    
        }
       
       
        function addRow() {
            var z = 1; // by default one goal
            var r;
    
            if(ArrayRid.length>0){
                var addthedeletedRows = [...ArrayRid].sort((a,b)=>a-b);
                r = addthedeletedRows[0];
                ArrayRid = removeItemOnce(addthedeletedRows, r);
                console.log(ArrayRid, "updated ArrayRid");
    
            } else {
                var rowCount = document.querySelectorAll('#formcotnent>[id^=rowgoals]').length;
                r = parseInt(z + rowCount);
                r++;
            }
           
            
            console.log(r +" incre row id");
    
            if(fdiv && r<=ngoals){
                const div = document.createElement('div');
                div.setAttribute("id", "rowgoals"+r);
                var htmlContent = '<div class="mb-3 row">'+
                                        '<div class="col-1">'+
                                            //'<input type="button" value="-" class="deleterow" dataid='+r+' id="deleterow'+r+'">'+
                                            '<img src="'+images+'minus.png" class="deleterow img-responsive" dataid='+r+' id="deleterow'+r+'"/>'+
                                        '</div>'+
                                        '<div class="col-3">'+
                                            '<input type="text" class="form-control goals" id="igoals'+r+'"  placeholder="" value="Objective '+r+'" />'+
                                        '</div>'+
                                        '<div class="col-2">'+
                                            '<input type="number" min="1" max="100" class="form-control weight" id="weighting'+r+'"  placeholder="Enter Weighting" value="" required/>'+
                                            '<label class="percent">%</label>'+
                                            '<div class="invalid-feedback" id="err-weight">Weight is empty!</div>'+
                                        '</div>'+
                                        '<div class="col-4">'+
                                            '<select class="form-select prating" id="prating'+r+'" required>'+
                                                Options+
                                            '</select>'+
                                            '<div class="invalid-feedback" id="err-prating">Please select your rating</div>'+
                                        '</div>'+
                                        '<div class="col-2 textcenter">'+
                                            '<input type="number" class="form-control calc score" id="score'+r+'" readonly  value="" /><label class="spercent">%</label>'+
                                        '</div>'+
                                    '</div>';
                div.innerHTML = htmlContent;
                    
    
                //fdiv.insertAdjacentHTML('afterbegin', htmlContent);  
                //fdiv.insertAdjacentHTML('afterend', htmlContent);  
                fdiv.appendChild(div);
            }
           
    
            //sort the div after adding rows
            sortChildren(fdiv, (a, b) => +a.id.match( /\d+/ ) - +b.id.match( /\d+/ )); 
           
            deleteRowItem();
            pmCalc(); //full calculation
    
    
            //show/hide add goals
            var addgoals = document.getElementById("addgoals");
            if(r>=ngoals){
                Core.hide(addgoals);
            } else {
                Core.show(addgoals);
            } 
    
        } //addrows
    
        if (typeof addrows !== "undefined" && addrows) {
            addrows.addEventListener('click', addRow, false); 
        }
    
       
        function overallPerformaceValueEmpty(){
             // make this values empty
             var whatpercent =  document.getElementById('whatpercentage');
             var howpercent =  document.getElementById('howpercentage');
             var finalrate =  document.getElementById('finalrating');
             if(whatpercent || howpercent){
                 whatpercent.value="";
                 howpercent.value="";
                 Core.hide(finalrate);
             }
        }
    
      


      
       
        /*====================================
            Modal Popup
        ======================================*/
        var modal = document.getElementById("ModalRating"); //popup content
        // Get the button that opens the modal
        var ratingInfo = document.querySelectorAll("#ratingInfo");
        if(ratingInfo.length>0){
            Array.prototype.forEach.call (ratingInfo, function (rinfo, index) {
                rinfo.addEventListener('click', event => {
                    modal.style.display = "block";
                })
            });
        }


        // What Objectives
        var WHOBmodal = document.getElementById("ModalWhatObjectives"); //popup content

        // Get the button that opens the modal
        var whatObjectivesInfo = document.querySelectorAll("#whatobjectivepopup");

        // When the user clicks the button, open the modal 
        if(whatObjectivesInfo.length>0){
            Array.prototype.forEach.call (whatObjectivesInfo, function (whinfo, index) {
                whinfo.addEventListener('click', event => {
                    WHOBmodal.style.display = "block";
                })
            });
        }


         // popup content What Objectives Smart
         var WHOBSmartmodal = document.getElementById("ModalWhatObjectivesSmart"); 

         // Get the button that opens the modal
         var whatObjectiveSmartInfo = document.querySelector("#whatobjectivesmart");
 
         // When the user clicks the button, open the modal 
         if(whatObjectiveSmartInfo){
            whatObjectiveSmartInfo.addEventListener('click', event => {
                event.preventDefault();
                WHOBSmartmodal.style.display = "block";
             });
         }


          // popup content What Objectives Individual development plan 
          var WHOBIndividualDevmodal = document.getElementById("ModalWhatObjectivesIndividualPlan"); 

          // Get the button that opens the modal
          var whatObjectiveDevPlanInfo = document.querySelector("#whatobjectivedevplan");
  
          // When the user clicks the button, open the modal 
          if(whatObjectiveDevPlanInfo){
            whatObjectiveDevPlanInfo.addEventListener('click', event => {
                event.preventDefault();
                WHOBIndividualDevmodal.style.display = "block";
              });
          }




         // popup content Final Results
         var FResultsmodal = document.getElementById("ModalFinalResults"); 

         // Get the button that opens the modal
         var finalResultsInfo = document.querySelector("#finalresultspopup");
 
         // When the user clicks the button, open the modal 
         if(finalResultsInfo){
            finalResultsInfo.addEventListener('click', event => {
                FResultsmodal.style.display = "block";
             });
         }


         //popup content FX RATES
         var FxRatesmodal = document.getElementById("ModalFXrates"); 
         // Get the button that opens the modal
         var fxRatesInfo = document.querySelector("#fxratespopup");
 
         // When the user clicks the button, open the modal 
         if(fxRatesInfo){
            fxRatesInfo.addEventListener('click', event => {
                event.preventDefault();
                FxRatesmodal.style.display = "block";
             });
         }


          //popup content FX RATES
          var Valuesmodal = document.getElementById("ModalValues"); 
          // Get the button that opens the modal
          var valuesInfo = document.querySelector("#valuesInfo");
  
          // When the user clicks the button, open the modal 
          if(valuesInfo){
            valuesInfo.addEventListener('click', event => {
                 event.preventDefault();
                 Valuesmodal.style.display = "block";
              });
          }

          

         

        // Close Modal Popups 
        // Get the <span> element that closes the modal
        /*var McloseBtn = document.getElementsByClassName("close")[0];
        if(McloseBtn){
            McloseBtn.addEventListener('click', event => {
                modal.style.display = "none";
                WHOBmodal.style.display = "none";
                FResultsmodal.style.display = "none";
                FxRatesmodal.style.display = "none";
            });
        }*/


         // Get the button that opens the modal
         var McloseBtn = document.querySelectorAll(".close");

         // When the user clicks the button, open the modal 
         if(McloseBtn.length>0){
             Array.prototype.forEach.call (McloseBtn, function (closemodal, index) {
                closemodal.addEventListener('click', event => {

                    console.log(event.target.parentElement.parentElement.id);
                    console.log("popup")

                    if (event.target.parentElement.parentElement.id == "ModalRating") {
                        modal.style.display = "none";
                    }
        
                    if (event.target.parentElement.parentElement.id == 'ModalWhatObjectives') {
                        WHOBmodal.style.display = "none";
                    }

                    if (event.target.parentElement.parentElement.id == 'ModalWhatObjectivesSmart') {
                        WHOBSmartmodal.style.display = "none";
                    }

                    if (event.target.parentElement.parentElement.id == 'ModalWhatObjectivesIndividualPlan') {
                        WHOBIndividualDevmodal.style.display = "none";
                    }
        
                    if (event.target.parentElement.parentElement.id == "ModalFinalResults") {
                        FResultsmodal.style.display = "none";
                    }
        
                    if (event.target.parentElement.parentElement.id == "ModalFXrates") {
                        FxRatesmodal.style.display = "none";
                    }

                    if (event.target.parentElement.parentElement.id == "ModalValues") {
                        Valuesmodal.style.display = "none";
                    }

                    

                 })
             });
         }


        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function(event) {
            if (event.target == modal) { /*rating */
                modal.style.display = "none";
            }

            if (event.target == WHOBmodal) {
                WHOBmodal.style.display = "none";
            }

            if (event.target == WHOBSmartmodal) {
                WHOBSmartmodal.style.display = "none";
            }

            if (event.target == WHOBIndividualDevmodal) {
                WHOBIndividualDevmodal.style.display = "none";
            }

            if (event.target == FResultsmodal) {
                FResultsmodal.style.display = "none";
            }

            if (event.target == FxRatesmodal) {
                FxRatesmodal.style.display = "none";
            }

            if (event.target == Valuesmodal) {
                Valuesmodal.style.display = "none";
            }


        }




    /*====================================
            Window Load
    ======================================*/
        window.onload = function () {
        
            readJson(); // load the json content
            
            var performancePage =  document.getElementById('performancePage');   
            
            if(performancePage){
                inputHandler(); // load 5 data
                deleteRowItem();   // delete rows 
    
                //calculations
                setTimeout(() => 
                    pmCalc(),
                5);
            }
         
        };
     


})(); // custom js ends		




/*====================================
	JQUERY STARTS HERE 	
======================================*/
/*(function($) {
//"use strict";
			
})(jQuery);*/ 
 // jquery ends here


