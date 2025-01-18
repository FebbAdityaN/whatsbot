/**
 * Base by Irfan
 * Feature Added by @febbyadityan
 * Please don't delete it, to respect the author.
 */

"use strict";
require('dotenv').config();
const { downloadContentFromMessage } = require("@whiskeysockets/baileys");
const { color } = require("../lib/color");
const fs = require("fs");
const https = require('https');
const path = require("path");
const moment = require("moment-timezone");
const util = require("util");
const { exec } = require("child_process");
const yts = require("yt-search");
const logger = require("pino");
const { ytmp4, ytmp3, ttdl, fbdl } = require("ruhend-scraper");
const insta = require("priyansh-ig-downloader");
const gifted = require("gifted-dls");
const imgbb = require("imgbb-uploader");

/**           Gemini AI                */ 
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI("INPUT_YOUR_APIKEY");
const model = genAI.getGenerativeModel({
   model: "gemini-1.5-flash",
   systemInstruction: "Kamu adalah seorang Asisten. Bernama Keishu"
});

moment.tz.setDefault("Asia/Jakarta").locale("id");

module.exports = async (conn, msg, m) => {
	try {
		if (msg.key.fromMe) return
		const { type, isQuotedMsg, quotedMsg, mentioned, now, fromMe } = msg;
		const toJSON = (j) => JSON.stringify(j, null, "\t");
		const messageType = Object.keys(msg.message)[0]
		const from = msg.key.remoteJid;
		const msgKey = msg.key
		const chats = type === "conversation" && msg.message.conversation ? msg.message.conversation : type === "imageMessage" && msg.message.imageMessage.caption ? msg.message.imageMessage.caption : type === "videoMessage" && msg.message.videoMessage.caption ? msg.message.videoMessage.caption : type === "extendedTextMessage" && msg.message.extendedTextMessage.text ? msg.message.extendedTextMessage.text : msg.message.extendedTextMessage.contextInfo?.quotedMessage.imageMessage && msg.message.extendedTextMessage.contextInfo?.quotedMessage.videoMessage ? msg.message.extendedTextMessage.contextInfo?.quotedMessage.imageMessage : "";
		const args = chats.split(" ");
		const command = chats.toLowerCase().split(" ")[0] || "";
		const isGroup = msg.key.remoteJid.endsWith("@g.us");
		const groupMetadata = isGroup ? await conn.groupMetadata(from) : ''
		const groupName = isGroup ? groupMetadata.subject : ''
		const sender = isGroup ? msg.key.participant ? msg.key.participant : msg.participant : msg.key.remoteJid;
		const userId = sender.split("@")[0]
		const isOwner = ["62xxx@s.whatsapp.net"].includes(sender) ? true : false;
		const pushname = msg.pushName;
		const q = chats.slice(command.length + 1, chats.length);
		const botNumber = conn.user.id.split(":")[0] + "@s.whatsapp.net";
		const isCmd = chats.startsWith('#')
		const content = JSON.stringify(msg.message)
		const isMedia = (messageType === 'imageMessage' || messageType === 'videoMessage')
		const isQuotedImage = (messageType === 'extendedTextMessage' || messageType === 'imageMessage') && content.includes('imageMessage')
		const isQuotedVideo = (messageType === 'extendedTextMessage' || messageType === 'videoMessage') && content.includes('videoMessage')
		
		const isUrl = (url) => {
			return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, 'gi'))
		}
		
		async function downloadAndSaveMediaMessage (type_file, path_file) {
        	if (type_file === 'image') {
                var stream = await downloadContentFromMessage(msg.message.imageMessage || msg.message.extendedTextMessage?.contextInfo.quotedMessage.imageMessage, 'image')
                let buffer = Buffer.from([])
                for await(const chunk of stream) {
                	buffer = Buffer.concat([buffer, chunk])
                }
                fs.writeFileSync(path_file, buffer)
                return path_file
        	} else if (type_file === 'video') {
                var stream = await downloadContentFromMessage(msg.message.videoMessage || msg.message.extendedTextMessage?.contextInfo.quotedMessage.videoMessage, 'video')
                let buffer = Buffer.from([])
                for await(const chunk of stream) {
                	buffer = Buffer.concat([buffer, chunk])
                }
                fs.writeFileSync(path_file, buffer)
                return path_file
        	} else if (type_file === 'sticker') {
                var stream = await downloadContentFromMessage(msg.message.stickerMessage || msg.message.extendedTextMessage?.contextInfo.quotedMessage.stickerMessage, 'sticker')
                let buffer = Buffer.from([])
                for await(const chunk of stream) {
                	buffer = Buffer.concat([buffer, chunk])
                }
                fs.writeFileSync(path_file, buffer)
                return path_file
        	} else if (type_file === 'audio') {
                var stream = await downloadContentFromMessage(msg.message.audioMessage || msg.message.extendedTextMessage?.contextInfo.quotedMessage.audioMessage, 'audio')
                let buffer = Buffer.from([])
                for await(const chunk of stream) {
                	buffer = Buffer.concat([buffer, chunk])
                }
                fs.writeFileSync(path_file, buffer)
                return path_file
        	}
        }
		
		const reply = (teks) => {
			conn.sendMessage(from, { text: teks }, { quoted: msg });
		};
		
		const fakereply = (chat1, target, chat2) => {
		    conn.sendMessage(from, {text:chat1}, {quoted: { key: { fromMe: false, participant: `${target}@s.whatsapp.net`, ...(from ? { remoteJid: from } : {}) }, message: { conversation: chat2 }}})
		}
		
		const reactMessage = (react) => {
			var reactMsg = {
				react: {
					text: react,
					key: msg.key
				}
			}
			conn.sendMessage(from, reactMsg)
		}
		
		const getRandom = (ext) => {
			return `${Math.floor(Math.random() * 10000)}${ext}`
		}
		
		conn.readMessages([msg.key]);
		conn.sendPresenceUpdate("available", from);
		
		if (!isGroup && isCmd && !fromMe) {
			console.log("->[\x1b[1;32mCMD\x1b[1;37m]", color(moment(msg.messageTimestamp * 1000).format("DD/MM/YYYY HH:mm:ss"), "yellow"), color(`${command} [${args.length}]`), "from", color(pushname));
		}
		if (isGroup && isCmd && !fromMe) {
			console.log("->[\x1b[1;32mCMD\x1b[1;37m]", color(moment(msg.messageTimestamp * 1000).format("DD/MM/YYYY HH:mm:ss"), "yellow"), color(`${command} [${args.length}]`), "from", color(pushname), "in", color(groupName));
		}
		
		switch (command) {
			case '#start':
			case '#menu':
			case '#help':
               var textReply = `Hai ${pushname} 👋🏻
Aku adalah Bot WhatsApp, aku dapat mengunduh media seperti yang ada dibawah ini, dan juga di support oleh kecerdasan buatan (AI).

✨ *GEMINI AI* adalah platform kecerdasan buatan (AI) dari Google yang dapat membantu berbagai tugas dan data pengguna.
• *Penggunaan* : _Ajukan pertanyaan langsung tanpa perintah apa pun_

📢 *YOUTUBE DOWNLOADER*
• *Perintah* : #mp3 / #mp4 _input judul_
• *Contoh* : #mp3 / #mp4 birds of a feather
💌 *INSTAGRAM DOWNLOADER*
• *Perintah* : #igdl _link insta_
• *Contoh* : #igdl www.instagram.com/p/xxx/
💃🏻 *TIKTOK DOWNLOADER*
• *Perintah* : #ttdl _link tiktok_
• *Contoh* : #ttdl https://vt.tiktok.com/xxx/
👥 *FACEBOOK DOWNLOADER*
• *Perintah* : #fbdl _link fb_
• *Contoh* : #fbdl www.facebook.com/reel/xxx
👀 *TWITTER/X DOWNLOADER*
• *Perintah* : #xdl / #twtdl _link twitter_
• *Contoh* : #xdl https://x.com/link

_Media yang di privasi, tidak dapat di unduh._

(n) tolong gunakan bot dengan bijak.
*Bot Created By @febbyadityan*`
				reply(textReply)
				break
			case '#igdl':
				if (args.length < 2) return reply(`Input link dari Instagram, untuk mendownload media yang di inginkan.`)
				insta(q).then(dataIG => {
				reactMessage("❤️")
				if (dataIG.image) {
				  for (let i of dataIG.image) {
				     conn.sendMessage(from, {image: {url: i}}, {quoted: msg})
				     }
				}
				if (dataIG.video) {
				  for (let v of dataIG.video) {
				    new Promise(resolve => setTimeout(resolve, 2000));
				    conn.sendMessage(from, {video: {url: v.video}}, {quoted: msg})
				  }
				}
				}).catch(e => console.log(e), reply('Maaf terjadi kesalahan, sistem error atau link yang dikirimkan tidak benar.'))
				break
			case '#twtdl':
			case '#xdl':
				if (args.length < 2) return reply(`Input link untuk mendownload media dari Twitter/X.`)
				gifted.giftedtwitter(q).then(data => {
				   reactMessage("❤️")
				   reply('Tunggu sebentar, sedang mengunduh...')
				   var capt = `\`\`\`Enjoy\`\`\``
				   conn.sendMessage(from, { video: { url: data.results[1].url }, caption: capt }, { quoted: msg })
				   console.log(data.results[1].url)
				}).catch(e => {
				   reply('Maaf terjadi kesalahan, sistem error atau link yang dikirimkan tidak benar.')
				})
				break
			case '#fbdl':
				if (args.length < 2) return reply(`Input link untuk mendownload media dari Facebook.`)
				fbdl(q).then(data => {
				   var dataFB = `\`\`\`Media Ditemukan\`\`\`\n*Resolusi:* ${data.data[0].resolution}`
				   conn.sendMessage(from, { video: { url: data.data[0].url }, caption: dataFB }, { quoted: msg })
				   reactMessage("❤️")
				   }).catch(e => {
				   console.log(e)
				   reply('Maaf terjadi kesalahan, sistem error atau link yang dikirimkan tidak benar.')})
				break
			case '#ttdl':
			case '#tiktok':
			case '#tiktokdl':
				if (args.length < 2) return reply(`Input link untuk mendownload video dari TikTok.`)
				reactMessage("❤️")
				ttdl(q).then(data => {
				   var dataTT = `\`\`\`Video Ditemukan\`\`\`\n\n*Username:* ${data.username}\n*Publish:* ${data.published}\n*Likes:* ${data.like}\n*Views:* ${data.views}\n\n\`\`\`Enjoy!\`\`\``
				   conn.sendMessage(from, { video: { url: data.video_hd }, caption: dataTT }, { quoted: msg })
				   reply(`Jika kamu ingin mendownload background musik nya:\n${data.music}\n\n\`\`\`Sedang mengirim video...\`\`\``)
				}).catch(e => {
				   console.log(e)
				   reply('Maaf terjadi kesalahan, sistem error atau link yang dikirimkan tidak benar.')})
				break
			case '#ytmp3':
			case '#mp3':
				if (args.length < 2) return reply(`Input judul untuk mendownload mp3.`)
				var url = await yts(q)
				reactMessage("❤️")
				ytmp3(url.all[0].url).then(data => {
					var dataAudio = `\`\`\`Lagu Ditemukan\`\`\`\n\nJudul: ${data.title}\nChannel: ${data.author}\nDurasi: ${data.duration}\n\n\`\`\`Mengirim...\`\`\``
					conn.sendMessage(from, { image: { url: data.thumbnail }, caption: dataAudio}, { quoted: msg })
					conn.sendMessage(from, { document: { url: data.audio }, fileName: `${data.title}.mp3`, mimetype: 'audio/mp3' }, { quoted: msg })
				}).catch(e => reply('Maaf terjadi kesalahan, sistem error atau link yang dikirimkan tidak benar.'))
				break
			case '#ytmp4':
			case '#mp4':
			    if (args.length < 2) return reply(`Input judul untuk mendownload mp4.`)
				var url = await yts(q)
				reactMessage("❤️")
			    ytmp4(url.all[0].url).then(data => {
					reply('Tunggu sebentar, sedang mendownload...')
					var dataVideo = `\`\`\`Video Ditemukan\`\`\`\n\nJudul: ${data.title}\nChannel: ${data.author}\nDurasi: ${data.duration}\n\n\`\`\`Enjoy!\`\`\``
					conn.sendMessage(from, { video: { url: data.video }, caption: dataVideo }, { quoted: msg })
				}).catch(e => reply('Maaf terjadi kesalahan, sistem error atau link yang dikirimkan tidak benar.'))
			    break
			case '>>':
				if (!isOwner) return reply(`Maaf, ini hanya dapat digunakan oleh Owner Bot`)
				try {
					let evaled = await eval(q);
					if (typeof evaled !== "string")
					evaled = require("util").inspect(evaled);
					reply(`${evaled}`);
				} catch (e) {
					reply(`${e}`)
				}
				break
		default:
			if (isGroup) return // tidak dapat digunakan didalam grup
			// if (!['conversation', 'extendedTextMessage'].includes(msg.type)) return reply(`Maaf, aku hanya menerima pesan teks!`)
			console.log("->[\x1b[1;32mNew\x1b[1;37m]", color('Question From', 'yellow'), color(pushname, 'lightblue'), `: "${chats}"`)
			conn.sendPresenceUpdate("composing", from);
			try {
				/*
				* @febbyadityan
				* please include the source if you want to copy this code.
				* http://github.com/FebbAdityaN
				*/
				conn.gemini[sender] ? conn.gemini[sender] : conn.gemini[sender] = {}
				conn.gemini[sender].history ? conn.gemini[sender].history : conn.gemini[sender].history = []
				const caption = msg.message.imageMessage?.caption ? msg.message.imageMessage.caption : "";
				if (isQuotedImage) {
					const ran = getRandom('.jpg')
					const media = await downloadAndSaveMediaMessage("image", `./lib/${ran}`)
					const img = await imgbb("INPUT_YOUR_APIKEY", `./lib/${ran}`)
					const imgData = img.display_url.split(/\//);
					const imageResp = await fetch(`https://i.ibb.co.com/${imgData[3]}/${imgData[4]}`).then((response) => response.arrayBuffer());
					await new Promise(r => setTimeout(r, 3000));
					const result = await model.generateContent([
						{
							inlineData: {
								data: Buffer.from(imageResp).toString("base64"),
								mimeType: "image/jpeg",
							},
						},
						caption
					]);
					reply(result.response.text().trim())
					fs.unlinkSync(media)
					return reactMessage("❤️")
				} else {
					const chat = model.startChat(conn.gemini[sender])
					let resdata = await chat.sendMessage(chats);
					conn.gemini[sender].history.push({
						role: "user",
						parts: [{
							text: chats
						}]
					}, {
						role: "model",
						parts: [{
							text: resdata.response.text().trim()
						}]
					})
					reply(resdata.response.text().trim());
					return reactMessage("❤️")
				}
			} catch(e) {
				console.log(e)
				reply("Server error, coba lain waktu:(")
			}
			break
    }
  } catch (err) {
    console.log(color("[ERROR]", "red"), err);
  }
};
