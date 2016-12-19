// "Random" seed list based on the date today
function random(date, indexdic) {
  var seed = date % 111111;
	for (var i = 0; i < 100 + indexdic; i++) {
		seed = seed * seed;
		seed = seed % 11111;   // Hey don't you love this number?? DON'T YOU??????
	}
	return seed;
}

var date = new Date();
var today = date.getFullYear() * 10000 + (date.getMonth() + 1) * 100 + date.getDate();

var directions = ["North","North-East","East","South-East","South","South-West","West","North-West"];
var activities = [
	{name:"Writting Leetcode", good:"You will learn more",bad:"Doing something else, you are not suit for leetcode today"},
	{name:"Take a shower", good:"You haven't take shower for a week!",bad:"You still want to code, yes?", weekend: true},
	{name:"Go to gym", good:"Inspired",bad:"Then you eat a lot, useless fitness", weekend: true},
	{name:"Smoking", good:"I mean imagine you are smoking",bad:"Please don't", weekend: true},
	{name:"Using %t", good:"I don't know, this is just a random seed generate from a String",bad:"Just don't use it"},
	{name:"Take Exams", good:"You know everything",bad:"The exam is extremely hard"},
    {name:"Write a looooong methods", good:"Your codes are better organized, go for it!",bad:"You even can't understand it yourself"},
	{name:"Submit Assignment", good:"Perfect codes, no bugs.",bad:"Bug everywhere, can't even run for the simplist case"},
	{name:"Playing LOL", good:"Because you are good at it",bad:"You need to go study"},
	{name:"Playing DOTA", good:"Because you are good at it",bad:"Go study", weekend: true},
	{name:"Browse Steam", good:"Hey there is a discount today",bad:"Are you really want to study?"},
	{name:"Take Interview", good:"Your interviewe are happy today and will accept you",bad:"You interviewer just break up with his gf"},
	{name:"Study at Grainger", good:"A good place to study",bad:"Go to LaTea XD", weekend: true},
	{name:"Go Date someone", good:"You might not fail",bad:"You must fail", weekend: true},
	{name:"Study at Grainger", good:"A good place to study",bad:"Go to LaTea XD", weekend: true},
	{name:"Watching Porn", good:"Inspire xD",bad:"You won't study anymore", weekend: true},
	{name:"Sleep", good:"I guess you are human",bad:"You shall not pass"},
	{name:"Debug", good:"All bugs will be fixed!",bad:"You will generate more new bugs"},
	{name:"Group Meeting", good:"Your group memebers have great ideas today!",bad:"Everypne's brains is filled with bugs."},
	{name:"Eat Sakanaya", good:"Best Japanese food in Champaign!",bad:"So expensive"},
    {name:"Brwosing Through Github", good:"You will found some great idea!",bad:"You get nothing"},
    {name:"Open a hearthstone Pack", good:"WOW, Golden Legendary",bad:"WOW, four common and one rare :) "},
];

var tools = ["Eclipse", "Windows 8", "Linux", "MacOS", "IE", "Android", "iOS", "Vim", "Windows Phone", "Netbeans", "Firefox", "Chrome", "Chromium", "Emacs"];


var drinks = ["Water","Tea","Milkis","Green Tea","Coffee","House Milk Tea","Coke","Milk","Orange Juice","Red Bull","Monster","Aloe"];

function getTodayString() {
	return date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate();
}

// Generate random list and put them into webpage
function PageGenerator() {
	var eventArr = ActivityGenerator(12);
    for(var i=0; i < 5; i++){
        var left_str = '<article class="object-column left"><h1 class="object-title">' + eventArr[i].name + '</h1><h2 class="intro-link">' + eventArr[i].good + '</h2></article>';
        var right_str = '<article class="object-column right"><h1 class="object-title">' + eventArr[5+i].name + '</h1><h2 class="intro-link">' + eventArr[5+i].bad + '</h2></article>';
        $('.divination').append('<section class="object">'+left_str+right_str+'</section>');
    }

	
	
}

function isWeekend() {
    return date.getDay() == 0 || date.getDay() == 6;
}

function filter(activities) {
    var result = [];
    
    // Only keep weekend == true event on the weekend (such as no interview on weekend)
    if (isWeekend()) {
        
        for (var i = 0; i < activities.length; i++) {
            if (activities[i].weekend) {
                result.push(activities[i]);
            }
        }
        
        return result;
    }
    
    return activities;
}


// Choose x random activity, which x = size
function ActivityGenerator(size) {
	var picked_events = pickRandom(filter(activities), size);
	
	for (var i = 0; i < picked_events.length; i++) {
		picked_events[i] = scan(picked_events[i]);
	}
	
	return picked_events;
}

// Choose x random array, which x = size
function pickRandom(array, size) {
	var result = [];
	
	for (var i = 0; i < array.length; i++) {
		result.push(array[i]);
	}
	
	for (var j = 0; j < array.length - size; j++) {
		var index = random(today, j) % result.length;
		result.splice(index, 1);
	}
	
	return result;
}

// Replace items with item in the item list
function scan(event) {
	var result = {name: event.name, good: event.good, bad: event.bad};  // clone
	
    if (result.name.indexOf('%l') != -1) {
		result.name = result.name.replace('%l', (random(today, 12) % 247 + 30).toString());
	}
    
	if (result.name.indexOf('%v') != -1) {
		result.name = result.name.replace('%v', varNames[random(today, 12) % varNames.length]);
	}
	
	if (result.name.indexOf('%t') != -1) {
		result.name = result.name.replace('%t', tools[random(today, 11) % tools.length]);
	}
	
	return result;
}

//pushing content onto the webpage
$(function(){
    $('.drink_value').html(pickRandom(drinks,2).join());
	$('.date').html(getTodayString());
	$('.direction_value').html(directions[random(today, 2) % directions.length]);
	PageGenerator();
});

