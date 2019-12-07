const VDF = require('./index');

let test1 = `
"Inline objects and arrayifying"
{
	"0"		{ "label" "#SFUI_CashColon"	}
	"1"		{ "label" "#SFUI_WinMatchColon"			"value" "#SFUI_Rounds" }
	"2"		{ "label" "#SFUI_TimePerRoundColon"		"value" "2 #SFUI_Minutes" }
	"2"		{ "label" "#SFUI_TimePerRoundColon"		"value" "2 #SFUI_Minutes" }
	"3" "value before object"
	"3"		{ "label" "#SFUI_BuyTimeColon"			"value" "45 #SFUI_Seconds" }
	"4"		{ "label" "#SFUI_SpectateColon"			"value" "#SFUI_SpectateTeamOnly" }
	"4"		{ "label" "#SFUI_SpectateColon"			"value" "#SFUI_SpectateTeamOnly" }
	"4" "value after object"
	"5"		{ "label" "#SFUI_BotsColon_1"				"value" "#SFUI_BotDifficulty3_1" // random comment, don't mind me
	"label" "#SFUI_BotsColon_2"				"value" "#SFUI_BotDifficulty3_2" }
	"6" 	{ "label" "#SFUI_WinMatchColon"		}// ignore:	"value" "#SFUI_Rounds" }
	// Syntax error: "7" 	{ "label" "#SFUI_WinMatchColon"			"value" } // ignore: "#SFUI_Rounds" }
} empty{}empty2{empty{}}
no_quotes_tests { // dat no newline + a comment!
	0 "-12.34"
	0 -1234
	0 12.34
	0 -12.34
	test1 1
	test2 val2 test3 true test3 false
	test4 ""
	//no_value // this would fail, but is probably malformed anyways, not handling this case
}
misc
{
    "EscapedQuotes" "aaa/////\\\\\\nooo\\"{{uuu\\"\\"{{\\"hhh"
	// with conditional to ignore
	"Menu_Dlg_Leaderboards_Lost_Connection"         "You must be connected to Xbox LIVE to view Leaderboards. Please check your connection and try again." [$X360]
	"SFUI_GameModeProgressDisclaimer"         "No stats tracking." [$WIN32||$X360]
	"SFUI_SinglePlayer_Invite_On"          ""      [!$PS3]
	"SFUI_Upsell_Nav"        "\${west} Unlock Full Game     \${confirm} Quit     \${cancel} Back to Game" [!$WIN32&&!$OSX]
	"Cstrike_TitlesTXT_TRAINING6"                                                            "Defuse the bomb by aiming at bomb and holding \${use}."
}
`;

let test1_expect = {
    'Inline objects and arrayifying': {
        '0': { label: '#SFUI_CashColon' },
        '1': { label: '#SFUI_WinMatchColon', value: '#SFUI_Rounds' },
        '2': [
            { label: '#SFUI_TimePerRoundColon', value: '2 #SFUI_Minutes' },
            { label: '#SFUI_TimePerRoundColon', value: '2 #SFUI_Minutes' }
        ],
        '3': [
            'value before object',
            { label: '#SFUI_BuyTimeColon', value: '45 #SFUI_Seconds' }
        ],
        '4': [
            { label: '#SFUI_SpectateColon', value: '#SFUI_SpectateTeamOnly' },
            { label: '#SFUI_SpectateColon', value: '#SFUI_SpectateTeamOnly' },
            'value after object'
        ],
        '5': {
            label: [ '#SFUI_BotsColon_1', '#SFUI_BotsColon_2' ],
            value: [ '#SFUI_BotDifficulty3_1', '#SFUI_BotDifficulty3_2' ]
        },
        '6': { label: '#SFUI_WinMatchColon' }
    },
    empty: {},
    empty2: {empty: {}},
    no_quotes_tests: {
        '0': [ -12.34, -1234, 12.34, -12.34 ],
        test1: 1,
        test2: 'val2',
        test3: [ true, false ],
        test4: ''
    },
    misc: {
        EscapedQuotes: 'aaa/////\\\\\\nooo\\"{{uuu\\"\\"{{\\"hhh',
        Menu_Dlg_Leaderboards_Lost_Connection: 'You must be connected to Xbox LIVE to view Leaderboards. Please check your connection and try again.',
        SFUI_GameModeProgressDisclaimer: 'No stats tracking.',
        SFUI_SinglePlayer_Invite_On: '',
        SFUI_Upsell_Nav: '${west} Unlock Full Game     ${confirm} Quit     ${cancel} Back to Game',
        Cstrike_TitlesTXT_TRAINING6: 'Defuse the bomb by aiming at bomb and holding ${use}.'        
    }
};

let test1_result = VDF.parse(test1);
//console.log(test1_result);

if (JSON.stringify(test1_result) === JSON.stringify(test1_expect)) {
    console.log("Tests passed");
} else {
    console.error("Tests failed!");
}