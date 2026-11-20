# RxLife4 Website - GitHub Pages par free hosting

Ye folder aapki RxLife4 website ki poori copy hai. Isko Hyv ke bina, kisi bhi free hosting par chala sakte ho.
Is guide me GitHub Pages (bilkul free) ke steps hain. Koi coding nahi chahiye.

Tip: ye sab laptop/PC par karna sabse aasan hai. Phone par folder upload karna mushkil hota hai.

---

## Is folder me kya hai

- `index.html` - website ka main page (sab sections isi me hain)
- `style.css` - design (colors, layout)
- `script.js` - buttons, search, reels player, etc.
  Homepage ke rotating drug card me nayi drug jodni ho to `script.js` ke upar `FEATURED_DRUGS` list me ek line add karo.
- `assets/img/` - logo aur saari images
- `assets/video/` - dono reels
- `assets/pdf/` - Unit II aur Unit III ke slides PDF (website par Download link inhi se chalte hain)
- `.nojekyll` - ek chhoti khaali file, GitHub ko batati hai ki kuch badalna nahi hai (hidden file hai, dikhe nahi to koi dikkat nahi)

Zaroori: `index.html` repository ke sabse upar (root me) dikhni chahiye, kisi folder ke andar nahi.

---

## Step 1: GitHub account banao (Create account)

1. Browser me https://github.com kholo.
2. "Sign up" dabao. Email, password aur username daalo.
   Username chhota aur simple rakhna, jaise `rxlife4`. Ye aapke link me aayega.
3. Email par aaya code daalke account verify karo.

## Step 2: Naya repository banao (New repository)

1. Login ke baad upar right me `+` dabao, phir "New repository".
2. Repository name me likho: `rxlife4` (ya jo bhi naam chahiye, bina space ke).
3. **Public** select karo. (Free Pages ke liye public hona chahiye.)
4. Baaki kuch mat badlo. "Create repository" dabao.

## Step 3: Files upload karo (Add file > Upload files)

1. Is ZIP ko pehle **unzip** karo (right click > Extract All).
2. Naye repository ke page par "uploading an existing file" link dabao.
   Ya "Add file" > "Upload files" dabao.
3. Unzip hue folder ko kholo. Uske **andar ki saari files aur folders** select karo
   (`index.html`, `style.css`, `script.js`, `assets` folder, `README.md`, `.nojekyll`).
   Pura bahar wala folder nahi, uske andar ka sab kuch.
4. Unhe seedha browser ke upload box me drag karke chhod do.
5. Upload poora hone do (1-2 minute lag sakte hain).
6. Neeche "Commit changes" (green button) dabao.
7. Check karo: repository ke pehle page par `index.html` seedha dikh rahi ho, aur `assets` folder bhi.

## Step 4: Pages on karo (Settings > Pages)

1. Repository me upar "Settings" dabao.
2. Left side me "Pages" dabao.
3. "Build and deployment" me **Source** = "Deploy from a branch".
4. **Branch** = `main`, folder = `/ (root)`. Phir "Save" dabao.

## Step 5: 1-2 minute ruko

Pages ka status page ke upar dikhega. 1-2 minute baad refresh karo.
Jab upar likha aaye "Your site is live at ...", wo link kholo.

## Aapki website ka link

```
https://<username>.github.io/<repo>/
```

Example: username `rxlife4` aur repository `rxlife4` ho to link hoga
`https://rxlife4.github.io/rxlife4/`

Agar link khulne par "404" dikhe: 1-2 minute aur ruko, aur check karo ki `index.html` root me hai.

---

## Baad me update kaise karein

1. Repository kholo. Jis file ko badalna hai (ya nayi file/PDF daalni hai) uske liye
   "Add file" > "Upload files" dabao.
2. Nayi file drag karo. Same naam ki file ho to wo purani ko replace kar degi.
3. "Commit changes" dabao. 1-2 minute me website update ho jayegi.
   (Naya PDF daalna ho to `assets/pdf/` folder ke andar daalo.)

## Apna domain lagana (optional)

Agar aapke paas apna domain hai (jaise `rxlife4.com`):

1. Repository > Settings > Pages > "Custom domain" me apna domain likho, Save.
2. Domain jahan se kharida hai wahan DNS settings me GitHub ke bataye records daalo
   (GitHub Pages ke "custom domain" page par exact records likhe hote hain).
3. Thodi der baad "Enforce HTTPS" ka tick laga do.

Domain nahi hai to kuch karne ki zaroorat nahi, upar wala free link kaafi hai.

---

## Ek zaroori baat

- Website me "topic request" wala box sirf message copy karta hai, phir Instagram DM me bhejna hota hai. Isme koi server nahi chahiye, to GitHub Pages par bhi bilkul waise hi chalega.
- Website device ke apne fonts use karti hai, koi bahar ka font ya internet service nahi chahiye.
- Instagram aur 2 research links par jaane wale buttons hi internet maangte hain (wo to dusri websites hain).
