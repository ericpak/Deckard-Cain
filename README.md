# Deckard Cain: a Diablo 3 Discord Bot
[Add Deckard Cain](https://discordapp.com/oauth2/authorize?client_id=426943692121702400&permissions=8&scope=bot)
------------------------------------------------------------------------------
#### Commands

Commands | Description | Usage
---------|-------------|--------
:grift | Get information about greater rifts | :grift \[rank\[to \<rank>]] [dm\|public] \[region] \[ladder] \[soft\|hardcore] \[seasonal\|era] 
:help | Get basic information on the commands with no arguments or detailed information with a command for an argument | :help \[command]
:prefix | With an Admin role you can change the prefix of the bot. | :prefix \[current prefix] to \[new prefix]
:settings | With a D3Mod role you can change the default settings of the :grift command. | :settings \[rank\[to \<rank>]] [dm\|public] \[region] \[ladder] \[soft\|hardcore] \[seasonal\|era] 
:speak | Listen to Deckard Cains sweet soothing voice. | :speak

-------------------------------------------------------------------------------
#### Arguments

Argument | Description | Possible Arguments
---------|-------------|-----------------------
\[rank\[to \<rank>]] | Type in a number to view details on that greater rift or a number to number to view a range of results. | # \[to #] (50) (50 to 60)
\[dm\|public] | Receive the information either as a Direct Message or in the channel you sent it. | dm public
\[region] | Choose the region you wish to view. | us eu kr tw
\[ladder] | Choose the ladder you wish to view. | barb barbarian cru sader crusader dh demonhunter monk wd witchdoctor wiz wizard nec necro necromancer t2 team2 t3 team3 t4 team4
\[soft\|hardcore] | Choose to view either the soft or hardcore ladder. | sc soft softcore hc hard hardcore
\[seasonal\era] | Choose to view either the seasonal or era ladder. | season seasonal ns era nonseasonal

-------------------------------------------------------------------------------
#### Additional Notes

If you've changed your prefix from the default ":" and forgotten it then all is not lost. You can type "Deckard Cain Prefix" with the exact same capitals to figure out your prefix.

Deckard Cain comes with the default values of ":grift public us barb softcore seasonal 1 to 10". You can also check the default values you currently have by typing :grift view defaults.

All arguments are optional and don't have to be written in any specific order unless specified.

-------------------------------------------------------------------------------
#### Examples

:grift<br />
:grift 20 to 25<br />
:grift monk eu 1 to 15<br />
:grift eu hc team4 300 to 310<br />
:grift dm kr softcore crusader 500<br />

---------------------------------------------------------------------------------
##### Contact

If you want to contact the developer, give feedback, submit a bug, or suggest a feature feel free to join the 
