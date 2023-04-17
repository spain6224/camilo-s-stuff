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


getgenv().zoom = 60

getgenv().autosprint = true

getgenv().godeoka = false
getgenv().norecoil = false

getgenv().noleaves = false
getgenv().boxesp = false
getgenv().namesp = false
getgenv().oreesp = false
getgenv().skeletonesp = false

getgenv().Thickness = 2


getgenv().NameColor = Color3.new(1,1,1)
getgenv().BoxColor = Color3.new(1, 1, 1)
getgenv().Skelesp = Color3.new(1,1,1)

local nameesp = function(part)
    local text = Drawing.new('Text')
    text.Size = 16
    text.Center = true
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
            text.Color = getgenv().NameColor
			updateloop:Disconnect()
            if not part then
				text:Destroy()
				updateloop:Disconnect()
			end	
        end)
	end)     
end

local boxesp = function(player)
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
            box.Color = getgenv().BoxColor
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

local skeleton = function(Player)
    local l1 = Drawing.new("Line") l1.Transparency = 1 l1.Thickness = getgenv().Thickness l1.Color = getgenv().Skelesp
    local l2 = Drawing.new("Line") l2.Transparency = 1 l2.Thickness = getgenv().Thickness l2.Color = getgenv().Skelesp
    local l3 = Drawing.new("Line") l3.Transparency = 1 l3.Thickness = getgenv().Thickness l3.Color = getgenv().Skelesp
    local l4 = Drawing.new("Line") l4.Transparency = 1 l4.Thickness = getgenv().Thickness l4.Color = getgenv().Skelesp
    local l5 = Drawing.new("Line") l5.Transparency = 1 l5.Thickness = getgenv().Thickness l5.Color = getgenv().Skelesp
    local l6 = Drawing.new("Line") l6.Transparency = 1 l6.Thickness = getgenv().Thickness l6.Color = getgenv().Skelesp
    local l7 = Drawing.new("Line") l7.Transparency = 1 l7.Thickness = getgenv().Thickness l7.Color = getgenv().Skelesp
    local l8 = Drawing.new("Line") l8.Transparency = 1 l8.Thickness = getgenv().Thickness l8.Color = getgenv().Skelesp
    local l9 = Drawing.new("Line") l9.Transparency = 1 l9.Thickness = getgenv().Thickness l9.Color = getgenv().Skelesp
    
    
    local skeletonupdater; skeletonupdater = game:GetService("RunService").RenderStepped:Connect(
        function()
        pcall(function()
            if not Player:IsDescendantOf(workspace) then
                skeletonupdater:Disconnect()
                l1:Destroy() l2:Destroy() l3:Destroy() l4:Destroy() l5:Destroy() l6:Destroy() l7:Destroy() l8:Destroy() l9:Destroy()
            end 
            local root, vis = workspace.CurrentCamera:WorldToViewportPoint(Player.Torso.CFrame.Position)
            local head = workspace.CurrentCamera:WorldToViewportPoint(Player.Head.CFrame.Position) local lowertorso = workspace.CurrentCamera:WorldToViewportPoint(Player.LowerTorso.CFrame.Position) local rarm = workspace.CurrentCamera:WorldToViewportPoint(Player.RightUpperArm.CFrame.Position) local rhand = workspace.CurrentCamera:WorldToViewportPoint(Player.RightHand.CFrame.Position) local rleg = workspace.CurrentCamera:WorldToViewportPoint(Player.RightUpperLeg.CFrame.Position) local rfoot = workspace.CurrentCamera:WorldToViewportPoint(Player.RightFoot.CFrame.Position) local lleg = workspace.CurrentCamera:WorldToViewportPoint(Player.LeftUpperLeg.CFrame.Position) local lfoot = workspace.CurrentCamera:WorldToViewportPoint(Player.LeftFoot.CFrame.Position) local larm = workspace.CurrentCamera:WorldToViewportPoint(Player.LeftUpperArm.CFrame.Position) local lhand = workspace.CurrentCamera:WorldToViewportPoint(Player.LeftHand.CFrame.Position)
    
            if not vis then
                l3.Visible = false l2.Visible = false l1.Visible = false l4.Visible = false l5.Visible = false l6.Visible = false l7.Visible = false l8.Visible = false l9.Visible = false
            end
			if getgenv().skeletonesp == true then
            l3.Visible = vis l2.Visible = vis l1.Visible = vis l4.Visible = vis l5.Visible = vis l6.Visible = vis l7.Visible = vis l8.Visible = vis l9.Visible = vis
			else
			l3.Visible = false l2.Visible = false l1.Visible = false l4.Visible = false l5.Visible = false l6.Visible = false l7.Visible = false l8.Visible = false l9.Visible = false
			end

            l9.Color = getgenv().Skelesp l8.Color = getgenv().Skelesp l7.Color = getgenv().Skelesp l6.Color = getgenv().Skelesp l5.Color = getgenv().Skelesp l4.Color = getgenv().Skelesp l3.Color = getgenv().Skelesp l2.Color = getgenv().Skelesp l1.Color = getgenv().Skelesp
 

            l1.From = Vector2.new(root.X, root.Y) l1.To = Vector2.new(head.X, head.Y)
            l6.From = Vector2.new(root.X, root.Y) l6.To = Vector2.new(rarm.X, rarm.Y)
            l7.From = Vector2.new(root.X, root.Y)  l7.To = Vector2.new(larm.X, larm.Y)
            l8.From = Vector2.new(root.X, root.Y) l8.To = Vector2.new(lleg.X, lleg.Y)
            l9.From = Vector2.new(root.X, root.Y) l9.To = Vector2.new(rleg.X, rleg.Y)
            l3.From = Vector2.new(rarm.X, rarm.Y) l3.To = Vector2.new(rhand.X, rhand.Y)
            l2.From = Vector2.new(larm.X, larm.Y) l2.To = Vector2.new(lhand.X, lhand.Y)
            l5.From = Vector2.new(rleg.X, rleg.Y) l5.To = Vector2.new(rfoot.X, rfoot.Y)
            l4.From = Vector2.new(lleg.X, lleg.Y) l4.To = Vector2.new(lfoot.X, lfoot.Y)
        end)
        --runservice loopend
        end)
    end


for i,v in next,game:GetService('Workspace'):GetChildren() do
    if v:FindFirstChild('Head') then
        boxesp(v)
		nameesp(v.Head)
        skeleton(v)
    end    
end

workspace.ChildAdded:Connect(function (v)
	if v:FindFirstChild('Head') then
		boxesp(v)
		nameesp(v.Head)
        skeleton(v)
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

local colorers = orebox:AddTab('ESPColors')
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

visbox:AddToggle('skelesp', {
    Text = 'Skeleton',
    Default = false ,
    Tooltip = 'Makes everyone get bones',

    Callback = function() 
		getgenv().skeletonesp = not getgenv().skeletonesp
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

colorers:AddLabel('Box Color'):AddColorPicker('ColorPicker', {
    Default = Color3.new(1, 1, 1), -- Bright green
    Title = 'Box Color', -- Optional. Allows you to have a custom color picker title (when you open it)
    Transparency = nil, -- Optional. Enables transparency changing for this color picker (leave as nil to disable)

    Callback = function(Value)
        getgenv().BoxColor = Value
    end
})

colorers:AddLabel('Name Color'):AddColorPicker('ColorPicker', {
    Default = Color3.new(1, 1, 1), -- Bright green
    Title = 'Name Color', -- Optional. Allows you to have a custom color picker title (when you open it)
    Transparency = nil, -- Optional. Enables transparency changing for this color picker (leave as nil to disable)

    Callback = function(Value)
        getgenv().NameColor = Value
    end
})

colorers:AddLabel('Skeleton Color'):AddColorPicker('ColorPicker', {
    Default = Color3.new(1, 1, 1), -- Bright green
    Title = 'Skeleton Color', -- Optional. Allows you to have a custom color picker title (when you open it)
    Transparency = nil, -- Optional. Enables transparency changing for this color picker (leave as nil to disable)

    Callback = function(Value)
        getgenv().Skelesp = Value
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
