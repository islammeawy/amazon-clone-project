import formatCurrency from '../../scripts/utils/money.js';

if(formatCurrency(9025) === '90.25'){
    console.log('passed');
}else{
    console.log('failed');
}


if(formatCurrency(0) === '0.00'){
    console.log('passed');
}else{
    console.log('failed');
}

if(formatCurrency(10000) === '100.00'){
    console.log('passed');
}else{
    console.log('failed');
}

if(formatCurrency(2000.5) === '20.01'){
    console.log('passed');
}else{
    console.log('failed');
}

if(formatCurrency(2000.55) === '20.01'){
    console.log('passed');
}else{
    console.log('failed');
}
if(formatCurrency(2000.4) === '20.00'){
    console.log('passed');
}else{
    console.log('failed');
}

if(formatCurrency(2000.49) === '20.00'){
    console.log('passed');
}else{
    console.log('failed');
}