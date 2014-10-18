var app = angular.module('event', ['toaster','ui.bootstrap','ngMessages']);
app.controller('Controller',['$scope', '$timeout', 'toaster',
function Controller($scope, $timeout, toaster)
{
			console.log($scope.mdl_send);
	//This variable for couniting events
	var i=0;
	
	// creating object for save data
	$scope.items=[
	];

	// Counting characters in text area
	$scope.message = "";
    $scope.left  = function()
    {
    	return 150 - $scope.message.length;
    };

	//handle textbox and radio
	$scope.mdl_send = 'val_now';
	$scope.isShown = function(value)
	{
		return value === $scope.mdl_send;
		/*if(angular.equals(value,"val_now"))
		{
			return value === $scope.mdl_send_now;
		}
		else
		{
			return value === $scope.mdl_send_later;
		}*/
    };
	

	//Save Events into table	
	$scope.SaveData = function()
	{	
		var send_opt;
		i=i+1;
		// Convert into date format
		$scope.convert = function(str)
		{
		    var date = new Date(str);
		        mnth = ("0" + (date.getMonth()+1)).slice(-2);
		        day  = ("0" + date.getDate()).slice(-2);
		    return [day, mnth, date.getFullYear() ].join("/");
		}
		
		if($scope.mdl_send == 'val_now')
		{
			send_opt = "Sent";
			//alert("send it now");
		}
		else
		{
			send_opt = $scope.convert($scope.LDate);
		}
		
		if($scope.chk_rem != true)
		{
			$scope.chk_rem = false;
		}
		if($scope.chk_gust != true)
		{
			$scope.chk_gust = false;
		}
		//alert($scope.LDate);
		//Store data in variable
		var item1 = {
			ETitle: $scope.title,
			Sdate: $scope.convert($scope.SDate),
			Edate: $scope.convert($scope.EDate),
			Description: $scope.message,
			Enbl_Rem: $scope.chk_rem,
			Enbl_Gust: $scope.chk_gust,
			Send_Option: send_opt
			};
		// Push date in items object
		$scope.items.push(item1);
		//Set null values after data saved
		$scope.title = null;
		$scope.SDate = null;
		$scope.EDate = null;
		$scope.LDate = null;
		$scope.message = "";
		$scope.chk_rem = false;
		$scope.chk_gust = false;
		
		// for save message
		var tooltipSpan = document.getElementById('save_message');
		window.onmousemove = function (e)
		{
			var x = e.clientX, y = e.clientY;
			tooltipSpan.style.top = (y + 20) + 'px';
			tooltipSpan.style.left = (x + 20) + 'px';
		};
		$scope.save_message = 'Your data saved.';
		$scope.showMessage = true;

		$timeout(function()
		{
			// Loadind done here - Show message for 3 more seconds.
			$timeout(function()
			{
				$scope.showMessage = false;
			}, 3500);
			
		});
		
		//Showing toaster message
		toaster.pop('success', "Save", "No.of events saved : "+i);
	};
	
	//Remove Events from the table	
	$scope.removeEvent = function(index)
	{
		i=i-1;
		$scope.items.splice(index, 1);
		toaster.pop('error', "Remove", "No.of events left : "+i);
	};

	// Set Min Date
	$scope.minDate =  new Date();
	
	//Date validation	
	$scope.CheckDate = function()
	{
		if(Date.parse($scope.SDate) < Date.parse($scope.LDate))
		{
			$scope.LDate = "";
		}	
	}
	
	// Open Datepicker for Start date
	$scope.Sopen = function($event)
	{
		$event.preventDefault();
		$event.stopPropagation();
		$scope.Sopened = true;
		
	};
	
	// Open Datepicker for End date
	$scope.Eopen = function($event)
	{
		$event.preventDefault();
		$event.stopPropagation();
		$scope.Eopened = true;
	};
	
	
	// Open Datepicker for send it later
	$scope.Latr_open = function($event)
	{	
		$event.preventDefault();
		$event.stopPropagation();
		$scope.Lopened = true;
		setTimeout(function() {
            $scope.Lopened = false;
        }, 10);
	};
}]);