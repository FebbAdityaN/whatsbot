/**
   * @febbyadityan
   * github.com/FebbAdityaN
   * Please don't delete it, to respect the author.
*/

"use strict";
const {
	default: makeWASocket,
	makeInMemoryStore,
	DisconnectReason,
	useMultiFileAuthState,
	PHONENUMBER_MCC,
	generateWAMessageFromContent,
	makeCacheableSignalKeyStore,
	Mimetype
} = require("@whiskeysockets/baileys")
const {
  Boom
} = require('@hapi/boom');
const figlet = require("figlet");
const fs = require("fs");
const moment = require('moment')
const chalk = require('chalk')
const logger = require('pino')
const clui = require('clui')
const path = require("path");
const { Spinner } = clui
const { serialize } = require("./lib/myfunc");
const { color, mylog, infolog } = require("./lib/color");
const time = moment(new Date()).format('HH:mm:ss DD/MM/YYYY')
// let setting = JSON.parse(fs.readFileSync('./config.json'));

const store = makeInMemoryStore({
  logger: logger().child({
    level: 'silent',
    stream: 'store'
  })
});

const readlineConfig = {
    input: process.stdin,
    output: process.stdout
};

const readline = require('readline');
const rl = readline.createInterface(readlineConfig);

const startWhatsApp = async () => {
	// Pairing Code
	const _0x484bf0=_0x50b7;(function(_0x51012e,_0x1eacfc){const _0x5fd928=_0x50b7,_0x2c773a=_0x51012e();while(!![]){try{const _0x1bcafe=-parseInt(_0x5fd928(0x189))/0x1+parseInt(_0x5fd928(0x180))/0x2+parseInt(_0x5fd928(0x18b))/0x3+parseInt(_0x5fd928(0x17b))/0x4*(parseInt(_0x5fd928(0x199))/0x5)+parseInt(_0x5fd928(0x18d))/0x6*(-parseInt(_0x5fd928(0x18e))/0x7)+parseInt(_0x5fd928(0x198))/0x8+parseInt(_0x5fd928(0x18c))/0x9;if(_0x1bcafe===_0x1eacfc)break;else _0x2c773a['push'](_0x2c773a['shift']());}catch(_0x549fce){_0x2c773a['push'](_0x2c773a['shift']());}}}(_0x124d,0x93b7c));const _0x4452b6=(function(){let _0x5650c3=!![];return function(_0x21b96c,_0x226f01){const _0x4b6eeb=_0x5650c3?function(){const _0x2ff3e6=_0x50b7;if(_0x226f01){const _0x59b8a6=_0x226f01[_0x2ff3e6(0x17c)](_0x21b96c,arguments);return _0x226f01=null,_0x59b8a6;}}:function(){};return _0x5650c3=![],_0x4b6eeb;};}()),_0x484152=_0x4452b6(this,function(){const _0x16c538=_0x50b7;return _0x484152[_0x16c538(0x17a)]()[_0x16c538(0x19c)](_0x16c538(0x190))[_0x16c538(0x17a)]()[_0x16c538(0x192)](_0x484152)[_0x16c538(0x19c)](_0x16c538(0x190));});function _0x124d(){const _0x2967ae=['startsWith','(((.+)+)+)+$','Please\x20enter\x20your\x20WhatsApp\x20number\x20(example:\x20628xxx):\x20','constructor','question','requestPairingCode','Your\x20pairing\x20code:','Cannot\x20use\x20pairing\x20code\x20with\x20mobile\x20API','authState','6918664FVHWuZ','790025oIeXkD','includes','replace','search','close','toString','16QgwsIG','apply','keys','argv','Masukan\x20nomor\x20WhatsApp\x20kamu\x20(Contoh:\x20628xxx):\x20','807598owiDKR','join','--use-pairing-code','bind','Chrome\x20(Linux)','creds','child','Masukan\x20nomor\x20WhatsApp\x20yang\x20diawali\x20dengan\x20kode\x20negara,\x20Contoh:\x20628xxxx','registered','1048919QsTgEM','log','401664KejMyi','7208721JXYXPS','12yaRAhQ','4135383xoOVsG'];_0x124d=function(){return _0x2967ae;};return _0x124d();}_0x484152();const question=_0x474022=>new Promise(_0x402e8f=>rl[_0x484bf0(0x193)](_0x474022,_0x402e8f)),pairingCodeEnabled=!![]||process[_0x484bf0(0x17e)]['includes'](_0x484bf0(0x182)),useMobileAPI=process[_0x484bf0(0x17e)][_0x484bf0(0x19a)]('--mobile'),{state,saveCreds}=await useMultiFileAuthState('./'+'sessions'),loggerConfig={'level':'silent'},conn=makeWASocket({'logger':logger(loggerConfig),'printQRInTerminal':!pairingCodeEnabled,'mobile':useMobileAPI,'auth':{'creds':state['creds'],'keys':makeCacheableSignalKeyStore(state[_0x484bf0(0x17d)],logger(loggerConfig)[_0x484bf0(0x186)](loggerConfig))},'browser':[_0x484bf0(0x184)]});store[_0x484bf0(0x183)](conn['ev']);function _0x50b7(_0x117273,_0x237b24){const _0x5d1bbd=_0x124d();return _0x50b7=function(_0x484152,_0x4452b6){_0x484152=_0x484152-0x179;let _0x124ddf=_0x5d1bbd[_0x484152];return _0x124ddf;},_0x50b7(_0x117273,_0x237b24);}if(pairingCodeEnabled&&!conn[_0x484bf0(0x197)][_0x484bf0(0x185)][_0x484bf0(0x188)]){if(useMobileAPI)throw new Error(_0x484bf0(0x196));let phoneNumber;!phoneNumber&&(phoneNumber=await question(_0x484bf0(0x191)),phoneNumber=phoneNumber[_0x484bf0(0x19b)](/[^0-9]/g,''),!Object[_0x484bf0(0x17d)](PHONENUMBER_MCC)['some'](_0x25477e=>phoneNumber[_0x484bf0(0x18f)](_0x25477e))&&(console['log'](_0x484bf0(0x187)),phoneNumber=await question(_0x484bf0(0x17f)),phoneNumber=phoneNumber[_0x484bf0(0x19b)](/[^0-9]/g,'')),rl[_0x484bf0(0x179)]()),setTimeout(async()=>{const _0xb4f2f8=_0x484bf0;let _0xe8d7ec=await conn[_0xb4f2f8(0x194)](phoneNumber);_0xe8d7ec=_0xe8d7ec['match'](/.{1,4}/g)[_0xb4f2f8(0x181)]('-')||_0xe8d7ec,console[_0xb4f2f8(0x18a)](_0xb4f2f8(0x195),_0xe8d7ec);},0x0);}

conn.gemini = conn.gemini || {};

conn.ev.on('connection.update', (update) => {
          if (global.qr !== update.qr) {
           global.qr = update.qr
          }
          const { connection, lastDisconnect } = update
            if (connection === 'close') {
                lastDisconnect.error?.output?.statusCode !== DisconnectReason.loggedOut ? startWhatsApp() : console.log('connection logged out...')
            }
        })
	conn.ev.on('creds.update', await saveCreds)


function title() {
      console.clear()
	  console.log(chalk.bold.green(figlet.textSync('Bot Keishu', {
		font: 'Standard',
		horizontalLayout: 'default',
		verticalLayout: 'default',
		width: 80,
		whitespaceBreak: false
	})))
	console.log(chalk.yellow(`\n                      ${chalk.yellow('[ Created By Febb ]')}\n\n${chalk.red('WhatsApp Bot')} : ${chalk.white('Keishu')}\n${chalk.red('Follow Insta Dev')} : ${chalk.white('@febbyadityan')}\n${chalk.red('Message Me On WhatsApp')} : ${chalk.white('+62 857-7026-9605')}\n`))
}

/**
* Uncache if there is file change;
* @param {string} module Module name or path;
* @param {function} cb <optional> ;
*/
function nocache(module, cb = () => { }) {
	// console.log(`Module ${module} sedang diperhatikan terhadap perubahan`) 
	fs.watchFile(require.resolve(module), async () => {
		await uncache(require.resolve(module))
		cb(module)
	})
}
/**
* Uncache a module
* @param {string} module Module name or path;
*/
function uncache(module = '.') {
	return new Promise((resolve, reject) => {
		try {
			delete require.cache[require.resolve(module)]
			resolve()
		} catch (e) {
			reject(e)
		}
	})
}

const status = new Spinner(chalk.cyan(` Booting WhatsApp Bot`))
const starting = new Spinner(chalk.cyan(` Preparing After Connect`))
const reconnect = new Spinner(chalk.redBright(` Reconnecting WhatsApp Bot`))

	title()
	
	/* Auto Update */
	require('./lib/myfunc')
	require('./message/msg')
	nocache('./lib/myfunc', module => console.log(chalk.greenBright('[ WHATSAPP BOT ]  ') + time + chalk.cyanBright(` "${module}" Telah diupdate!`)))
	nocache('./message/msg', module => console.log(chalk.greenBright('[ WHATSAPP BOT ]  ') + time + chalk.cyanBright(` "${module}" Telah diupdate!`)))
	
	conn.multi = true
	conn.nopref = false
	conn.prefa = 'testing'
	conn.ev.on('messages.upsert', async m => {
		if (!m.messages) return;
		var msg = m.messages[0]
		try { if (msg.message.messageContextInfo) delete msg.message.messageContextInfo } catch { }
		msg = serialize(conn, msg)
		msg.isBaileys = msg.key.id.startsWith('BAE5')
		require('./message/msg')(conn, msg, m)
	})

	conn.reply = (from, content, msg) => conn.sendMessage(from, { text: content }, { quoted: msg })
    
	conn.sendMessageFromContent = async(jid, message, options = {}) => {
		var option = { contextInfo: {}, ...options }
		var prepare = await generateWAMessageFromContent(jid, message, option)
		await conn.relayMessage(jid, prepare.message, { messageId: prepare.key.id })
		return prepare
	 }

	return conn
}

startWhatsApp()
.catch(e => console.log(e))
