local startTime = tick()

local lib = loadstring(game:HttpGet('https://raw.githubusercontent.com/violin-suzutsuki/LinoriaLib/main/Library.lua'))() 
local saver = loadstring(game:HttpGet('https://raw.githubusercontent.com/violin-suzutsuki/LinoriaLib/main/addons/SaveManager.lua'))()
local themer = loadstring(game:HttpGet('https://raw.githubusercontent.com/violin-suzutsuki/LinoriaLib/main/addons/ThemeManager.lua'))()
local CurrentCamera = workspace.CurrentCamera
local wtvp = CurrentCamera.worldToViewportPoint
local camera = game:GetService("Workspace").CurrentCamera
local orefolder = Instance.new("Folder", workspace)
orefolder.Name = 'orefolder'

local RunService = game:GetService("RunService")


local mcamera = getrenv()._G.modules.Camera

local ores = {
	['sulfur'] = Color3.fromRGB(248, 248, 248),
	['iron'] = Color3.fromRGB(199, 172, 120),
}



local function worldtoviewport(position)
    local a, b = workspace.CurrentCamera:WorldToViewportPoint(position)
    return Vector2.new(a.X, a.Y), b
end

local upateores = function()
for i,v in next, workspace:GetChildren() do
	if v:FindFirstChildWhichIsA('MeshPart') and v:FindFirstChildWhichIsA('MeshPart').Color == Color3.fromRGB(105, 102, 92) then
		for i2,v2 in next, v:GetChildren() do 
			v2.Parent.Parent = orefolder
			if v2.Color ~= Color3.fromRGB(105, 102, 92) then
				local highlight = Instance.new("Highlight", v2)
				highlight.Adornee = v2
				highlight.DepthMode = Enum.HighlightDepthMode.AlwaysOnTop
				highlight.Enabled = true
				if v2.Color == ores['sulfur'] then
					print('Sulfur')
					highlight.FillColor = Color3.fromRGB(248, 248, 248)
					highlight.FillTransparency = 0
					highlight.OutlineColor = Color3.fromRGB(248, 248, 248)
				elseif v2.Color == ores['iron'] then
					print('Iron')
					highlight.FillColor = Color3.fromRGB(199, 172, 120)
					highlight.FillTransparency = 0
					highlight.OutlineColor = Color3.fromRGB(199, 172, 120)
				end	
			end
		end
	end	
end
end

getgenv().noleaves = false
getgenv().boxesp = false
getgenv().namesp = false
getgenv().zoom = 60
getgenv().godeoka = false
getgenv().oreesp = false
getgenv().autosprint = true
getgenv().norecoil = false

local nameesp = function(part,color)
    local text = Drawing.new('Text')
    text.Size = 16
    text.Center = true
    text.Color = color
    text.Transparency = 1
    local updateloop = RunService.RenderStepped:Connect(function()
	pcall(function ()
		if not part:IsDescendantOf(workspace) then
				text:Destroy()
				updateloop:Disconnect()
            end
            local partpos = part.Position
            local spos,vis = worldtoviewport(part.Position)
            if not vis then
                text.Visible = false
            end
            if getgenv().namesp == true then
				text.Visible = vis
				else
				text.Visible = false
			end	
			text.Outline = true
			if part.Rotation == Vector3.new(0, 0, -120) then
				text.Text = 'Sleeper ['..math.floor((workspace.Ignore.LocalCharacter.Middle.Position - part.Position).Magnitude)..']'
			else
			text.Text = 'Player ['..math.floor((workspace.Ignore.LocalCharacter.Middle.Position - part.Position).Magnitude)..']'
			end	
            text.Position = spos
			updateloop:Disconnect()
            if not part then
				text:Destroy()
				updateloop:Disconnect()
			end	
        end)
	end)     
end

local boxesp = function(player,color)
    local box = Drawing.new('Square')
    local boxoutline = Drawing.new("Square")
    local updater = RunService.RenderStepped:Connect(function()
        pcall(function ()
            if not player:IsDescendantOf(workspace) then
				if box then
					box:Destroy()
				end	
				if boxoutline then
					boxoutline:Destroy()
					updater:Disconnect()
				end	
            end
            local root,vis = workspace.CurrentCamera:WorldToViewportPoint(player.HumanoidRootPart.Position) 
            local factor = 1 / (root.Z * math.tan(math.rad(workspace.CurrentCamera.FieldOfView * 0.5)) * 2) * 100
            local w,h = math.floor(40 * factor), math.floor(60 *  factor)
            boxoutline.Thickness = 4
            boxoutline.Filled = false
            boxoutline.Color = Color3.new(0, 0, 0)
            boxoutline.Transparency = 1
            boxoutline.Size = Vector2.new(w,h)
            boxoutline.Position = Vector2.new(root.X - box.Size.X / 2,root.Y - box.Size.Y / 2)
            boxoutline.ZIndex = 420

			if getgenv().boxesp == true then
			box.Visible = vis
			boxoutline.Visible = vis
				else
			box.Visible = false
			boxoutline.Visible = false
			end	

            
            box.Thickness = 2
            box.Filled = false
            box.Color = color
            box.Transparency = 1
            box.Size = Vector2.new(w,h)
            box.Position = Vector2.new(root.X - box.Size.X / 2,root.Y - box.Size.Y / 2)
            box.ZIndex = 421
            if not player then
                box:Destroy()
                boxoutline:Remove()
                updater:Disconnect()
            end    
            end)
        end)
end

for i,v in next,game:GetService('Workspace'):GetChildren() do
    if v:FindFirstChild('Head') then
        boxesp(v, Color3.new(255, 255, 255))
		nameesp(v.Head, Color3.new(255, 255, 255))
    end    
end

workspace.ChildAdded:Connect(function (v)
	if v:FindFirstChild('Head') then
		boxesp(v, Color3.new(255, 255, 255))
		nameesp(v.Head, Color3.new(255, 255, 255))
	end	
end)



local char = getrenv()._G.modules.Character
local player = getrenv()._G.modules.Player
local cam = getrenv()._G.modules.Camera
local cc = workspace.CurrentCamera
--NOT IMPORTANT
local mainwin = lib:CreateWindow({
	Title = 'camilo\'s epic ts script',
	Center = true,
	AutoShow = true,
	TabPadding = 8,
})

lib:SetWatermarkVisibility(true)




task.spawn(function ()
	while task.wait() do
		lib:SetWatermark('camilo\'s epic ts script \124 '..os.date("%H:%M"))
	end
end)


lib.KeybindFrame.Visible = true;

lib:OnUnload(function()
    lib.Unloaded = true
end)

---TABS
local tabs = {
 	main = mainwin:AddTab('Main'),
 	vis = mainwin:AddTab('Visuals'),
	
	--Settings should always be the last one
	setts = mainwin:AddTab('Settings')
}


---BOXES
local mainbox = tabs.main:AddLeftGroupbox('Main')
local rightmainbox = tabs.main:AddRightTabbox('Misc')
local visbox = tabs.vis:AddLeftGroupbox('Visuals')
local orebox = tabs.vis:AddRightTabbox('Ore visuals')
local settsbox = tabs.setts:AddLeftGroupbox('Settings')

local ore = orebox:AddTab('Ores')
local combatmisc = rightmainbox:AddTab('Misc')


---TOGGLES
mainbox:AddToggle('silent aim', {
    Text = 'Silent aim /i cant hook :(/',
    Default = false ,
    Tooltip = '?',

    Callback = function() return end 
})

combatmisc:AddToggle('sprint', {
    Text = 'Auto sprint',
    Default = true,
    Tooltip = 'Makes you sprint automatically',

    Callback = function() getgenv().autosprint = not getgenv().autosprint end 
})

combatmisc:AddToggle('eoka', {
    Text = 'Good Eoka',
    Default = false,
    Tooltip = 'No spread for eoka',

    Callback = function() getgenv().godeoka = not getgenv().godeoka end 
})

combatmisc:AddToggle('norecoil', {
    Text = 'No recoil',
    Default = false,
    Tooltip = 'No recoil for any gun',

    Callback = function() getgenv().godeoka = not getgenv().godeoka end 
})


visbox:AddToggle('boxesp', {
    Text = 'Box esp',
    Default = false ,
    Tooltip = '',

    Callback = function() 
		getgenv().boxesp = not getgenv().boxesp
	end 
})

visbox:AddToggle('nameesp', {
    Text = 'Name esp',
    Default = false ,
    Tooltip = 'not actually name esp somehow',

    Callback = function() 
		getgenv().namesp = not getgenv().namesp
	end 
})

visbox:AddToggle('noleaves', {
    Text = 'Remove leaves',
    Default = false ,
    Tooltip = '',

    Callback = function() 
		getgenv().noleaves = not getgenv().noleaves
	end 
})

ore:AddToggle('oreesp', {
    Text = 'Ore chams',
    Default = false ,
    Tooltip = '',

    Callback = function() 
		getgenv().oreesp = not getgenv().oreesp
	end 
})


---KEYBINDS
mainbox:AddLabel('Noclip'):AddKeyPicker('noclipkey', {
    Default = 'Z',
    SyncToggleState = false,
    Mode = 'Hold',
    Text = 'Noclip',
    NoUI = false,
    Callback = function(Value)
        char.SetNoclipping(Value)
    end,
    ChangedCallback = function(New) return end
})

mainbox:AddLabel('Zoom'):AddKeyPicker('zoomkey', {
    Default = 'X',
    SyncToggleState = false,
    Mode = 'Hold',
    Text = 'Zoom',
    NoUI = false,
    Callback = function(Value) return end,
    ChangedCallback = function(New) return end
})

mainbox:AddSlider('zoomrange', {
    Text = 'Zoom range',
    Default = getgenv().zoom,
    Min = 1,
    Max = 120,
    Rounding = 0,
    Compact = false,

    Callback = function(Value)
        getgenv().zoom = Value
    end
})

local nospread = combatmisc:AddButton({
    Text = 'No spread',
    Func = function()
        for i,v in next, game:GetService("ReplicatedStorage").ItemConfigs:GetChildren() do
			local module = require(v)
			module.Accuracy = 999999
		end
	end,
    DoubleClick = false,
    Tooltip = 'No spreads'
})


--CODE

task.spawn(function()
    while task.wait() do
        if getgenv().autosprint == true then
            getrenv()._G.modules.Character.Sprint(getgenv().autosprint)
		else
			local setsprint = function ()
				getrenv()._G.modules.Character.Sprint(getgenv().autosprint)
			end
			setsprint = function ()
			end
        end
        if lib.Unloaded then break end
end end)

task.spawn(function()
    while task.wait() do
        local state = Options.zoomkey:GetState()
        if state == true then
            cam.SetZoom(getgenv().zoom)
		else
			cam.SetZoom(1)
        end

        if lib.Unloaded then break end
end end)

task.spawn(function()
    while task.wait(2) do
        upateores()
        if lib.Unloaded then break end
    end
end)

task.spawn(function()
    while task.wait(0.2) do
        local state = Options.noclipkey:GetState()
        char.SetNoclipping(state)
        if lib.Unloaded then break end
    end
end)

task.spawn(function()
    while task.wait(0.2) do
		if getgenv().noleaves == true then
			for i,v in next, workspace:GetChildren() do
				if v:FindFirstChild('Leaves') then
					v.Leaves.Transparency = 1
			end	end
		else
			for i,v in next, workspace:GetChildren() do
				if v:FindFirstChild('Leaves') then
					v.Leaves.Transparency = 0.4
				end	end	end	
        if lib.Unloaded then break end
end end)

task.spawn(function()
	local old = mcamera.Recoil
    while task.wait(0.2) do
		if getgenv().nospread == true then
			mcamera.Recoil = function ()
				
			end
		else
			mcamera.Recoil = old
		end	
        if lib.Unloaded then break end
end end)

task.spawn(function()
    while task.wait(0.2) do
		if getgenv().godeoka == true then
			local blunder = game:GetService("ReplicatedStorage").ItemConfigs.Blunderbuss
			local required = require(blunder)
			required.Accuracy = 99999
		else
			local blunder = game:GetService("ReplicatedStorage").ItemConfigs.Blunderbuss
			local required = require(blunder)
			required.Accuracy = 1400
		end	
        if lib.Unloaded then break end
end end)


task.spawn(function()
    while task.wait(0.2) do
		if getgenv().oreesp == true then
			for i,v in next, workspace.orefolder:GetChildren() do
				for i1,v1 in next, v:GetChildren() do
				if v1:FindFirstChild('Highlight') then
					v1.Highlight.Enabled = true
				end	
				end
			end	
		else
			for i,v in next, workspace.orefolder:GetChildren() do
				for i1,v1 in next, v:GetChildren() do
				if v1:FindFirstChild('Highlight') then
					v1.Highlight.Enabled = false
				end	
				end
			end	
		end	
		if lib.Unloaded then break end
	end	
end)

--SETTINGS
settsbox:AddButton('Unload', function() Library:Unload() end)
settsbox:AddLabel('Menu bind'):AddKeyPicker('MenuKeybind', { Default = 'Insert', NoUI = true, Text = 'Menu keybind' })

Library.ToggleKeybind = Options.MenuKeybind -- Allows you to have a custom keybind for the menu
saver:SetLibrary(lib)
saver:SetIgnoreIndexes({ 'MenuKeybind' })
saver:SetFolder('camilo/trident-survival')
saver:BuildConfigSection(tabs['setts'])
saver:LoadAutoloadConfig()
themer:SetLibrary(lib)
themer:SetFolder('camilo')
themer:ApplyToTab(tabs['setts'])


lib:Notify(('Loaded in approximately %s second(s)'):format(('%.3f'):format(tick() - startTime)))
lib:Notify('All made by the greatest tridentse surivval hacker camilo ')
