 Aparat City Hud |Develop By IRaniGamerR

 My Discord : https://discord.gg/3BUbc8e





-----------------------------

# Requirements
* [es_extended](https://github.com/ESX-Org/es_extended)
* [esx_basicneeds](https://github.com/ESX-Org/esx_basicneeds)
* [esx_status](https://github.com/ESX-Org/esx_status)
* OPTIONAL [esx_optionalneeds](https://github.com/ESX-Org/esx_optionalneeds)

# Download & Installation
1) Download the .zip.
2) Extract the .zip or Open the .zip.
3) Place `esx_aparatcity-hud` in your ESX Directory
4) Add `start esx_aparatcity-hud` to your server.cfg



----------------
EN: Read More For Work Script



FA: برای فعال سازی باید حتما مراحل زیر را انجام دهید 
----------------

* Disable the following line in (resources\[essential]\es_extended\ui.html
Change
```html
<div id="hud"></div>
```
to
```html
<!--<div id="hud"></div>-->
```

* Disable the following lines in (resources\essentialmode\ui.html)
```html
<div id="starter" style="font-family: 'roboto'; color: white; position: absolute; left: 20%; top: 5%; width: 60%; background: rgba(40, 40, 40, 0.8)"></div>
<div id="container">
	<div id="money">
		<div id="cash"/>
	</div>
</div>
```
to
```html
<!--<div id="starter" style="font-family: 'roboto'; color: white; position: absolute; left: 20%; top: 5%; width: 60%; background: rgba(40, 40, 40, 0.8)"></div>
<div id="container">
	<div id="money">
		<div id="cash"/>
	</div>
</div>-->
```

* Add TriggerEvent in (resources\[esx]\esx_status\client\main.lua `esx_status:load`) 
```lua
TriggerEvent('esx_aparatcity-hud:updateStatus', GetStatusData(true))
```
to look like this
```lua
RegisterNetEvent('esx_status:load')
AddEventHandler('esx_status:load', function(status)

	for i=1, #Status, 1 do
		for j=1, #status, 1 do
			if Status[i].name == status[j].name then
				Status[i].set(status[j].val)
			end
		end
	end

	Citizen.CreateThread(function()
	  while true do

	  	for i=1, #Status, 1 do
	  		Status[i].onTick()
	  	end

			SendNUIMessage({
				update = true,
				status = GetStatusData()
			})
	
		TriggerEvent('esx_aparatcity-hud:updateStatus', GetStatusData(true))
	    Citizen.Wait(Config.TickTime)
	  end
	end)

end)
```

* Disabling Basic Needs Bars (resources\[esx]\esx_basicneeds\client\main.lua `esx_status:loaded`)
```lua
AddEventHandler('esx_status:loaded', function(status)

	TriggerEvent('esx_status:registerStatus', 'hunger', 1000000, '#FFFF00', -- amarelo
	--TriggerEvent('esx_status:registerStatus', 'hunger', 1000000, '#CFAD0F', -- GOLD
		function(status)
			return false -- Change to true to show hunger bar | false to hide hunger bar
		end, function(status)
			status.remove(100)
		end
	)

	TriggerEvent('esx_status:registerStatus', 'thirst', 1000000, '#0099FF', -- azul
	--TriggerEvent('esx_status:registerStatus', 'thirst', 1000000, '#0C98F1', -- CYAN
		function(status)
			return false -- Change to true to show thirst bar | false to hide thirst bar
		end, function(status)
			status.remove(75)
		end
	)
```

* Disabling Optional Needs Bar  (resources\[esx]\esx_optionalneeds\client\main.lua `esx_status:loaded`)
```
AddEventHandler('esx_status:loaded', function(status)

  TriggerEvent('esx_status:registerStatus', 'drunk', 0, '#8F15A5', 
    function(status)
      if status.val > 0 then
        return false -- Set to true to show if you drink | false to always hide
      else
        return false -- Set to true to always show | false to hide if 0
      end
    end,
    function(status)
      status.remove(1500)
    end
  )
```

Aparat City Hud |Develop By IRaniGamerR

My Discord : https://discord.gg/3BUbc8e
