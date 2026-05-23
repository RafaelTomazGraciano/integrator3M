import fs from 'node:fs'
import crypto from 'node:crypto'

// Ruan
export async function authRuan() {
	const res = await fetch("https://api-apostadores-fight-azure.vercel.app/login", {
		method: "POST",   
		body: JSON.stringify({
			"usuario": "admin",
			"senha": "123"
		}),
		headers: {
			"Content-Type": "application/json"
		}
	})
	const json = await res.json()
	return json.token
}

// Foguinho
const API_NAME = "bet3M";

function carregarChavePrivada() {
  if (process.env.PRIVATE_KEY_PEM) {
	return process.env.PRIVATE_KEY_PEM.replace(/\\n/g, "\n");
  }

  return fs.readFileSync("private_key.pem", "utf8");
}

export function gerarAssinatura(rota) {
  const privateKey = carregarChavePrivada();

  const mensagem = `${API_NAME}:${rota}`;

  const assinatura = crypto.sign("sha256", Buffer.from(mensagem), {
	key: privateKey,
	padding: crypto.constants.RSA_PKCS1_PSS_PADDING,
	saltLength: crypto.constants.RSA_PSS_SALTLEN_MAX_SIGN,
  });

  return assinatura.toString("base64");
}

export function headersRSA(rota) {
  return {
	"x-api-nome": API_NAME,
	"x-assinatura": gerarAssinatura(rota),
  };
}

// Vitor
const API_PEM = `
-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEApWnKjbb5YkSEeR6z/F8p
jlGxQd0hWD72+5I7E8b/3kRGosDRyrSJ323b3CRpLwWqKXsIfgGyDmakMzCcSm4N
hK+QBRrbdXiJWDN8n8hEAE6aJl7Sb2R4+DNNf2xPNdu3wr1bmGnhhcQOKHBDVXWd
WNMzuWL+A5EeWLy+87fIt4Myhojwza167aVmvwfK5Gf14JJTLdaIoR4kZlJsyEiq
6PuX0V824hsb5PFwNkL+UWYBLRt8WSd4Qi9Kej8zTtU30+gkbVbeihj52pGbOWPO
5GRiliIwubDgraI2Rmg/G7CUCogqmzt7YTBs5foGskrq/nYmzTAI+WBFfWdrgCd6
OQIDAQAB
-----END PUBLIC KEY-----`

export function authChina(data) {
	// Gera chave AES de 256 bits e IV de 128 bits aleatórios
  const aesKey = crypto.randomBytes(32); // 256 bits
  const iv = crypto.randomBytes(16);     // 128 bits

  // Cifra os dados com AES-256-CBC
  const cipher = crypto.createCipheriv('aes-256-cbc', aesKey, iv);
  const jsonData = JSON.stringify(data);
  const encryptedData = Buffer.concat([
	cipher.update(jsonData, 'utf8'),
	cipher.final()
  ]);

  // Cifra a chave AES com RSA (chave pública)
	const encryptedKey = crypto.publicEncrypt(
	{
	  key: API_PEM,
	  padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
	  oaepHash: "sha256",
	},
	aesKey
  );

  return {
	encryptedKey: encryptedKey.toString('base64'),
	iv: iv.toString('base64'),
	encryptedData: encryptedData.toString('base64'),
  };
}


// Duduzao
export async function authDuduzao(){
	const res = await fetch("https://api-aposta-lutas.vercel.app/auth/login", {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
			"usuario": "bet3M",
			"senha": "bet3MM"
		})
	})
	const json = await res.json()
	return json.token
}

// Gustav
const API_LUTADORES = 'https://lutadores-api-22f61a69f511.herokuapp.com';
let _privateKey = null;
let _servidorPublicKey = null;

export async function generateKey(){
	const res = await fetch(`${API_LUTADORES}/chave-publica`);
	const { publicKey: spkiB64 } = await res.json();
	const spkiBytes = Uint8Array.from(atob(spkiB64), c => c.charCodeAt(0));
	_servidorPublicKey = await crypto.subtle.importKey(
		'spki', spkiBytes, { name: 'RSA-OAEP', hash: 'SHA-256' }, false, ['encrypt']
	);

	const kp = await crypto.subtle.generateKey(
		{ name: 'RSA-OAEP', modulusLength: 2048, publicExponent: new Uint8Array([1,0,1]), hash: 'SHA-256' },
		true, ['encrypt', 'decrypt']
	);
	_privateKey = kp.privateKey;

	const spki = await crypto.subtle.exportKey('spki', kp.publicKey);
	const pubB64 = btoa(String.fromCharCode(...new Uint8Array(spki)));
	await fetch(`${API_LUTADORES}/handshake`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ publicKey: pubB64 })
	});
}

export async function decryptResponse(res) {
	if (res.headers.get('X-Content-Encrypted') !== 'true') return res;
	const chunks = JSON.parse(await res.text());
	const bytes = [];
	for (const chunk of chunks) {
		const cb = Uint8Array.from(atob(chunk), c => c.charCodeAt(0));
		const plain = await crypto.subtle.decrypt({ name: 'RSA-OAEP' }, _privateKey, cb);
		bytes.push(...new Uint8Array(plain));
	}
	const decoded = new TextDecoder().decode(new Uint8Array(bytes));
	return {
		json: () => JSON.parse(decoded)
	};
}
