/**
 * Connectify — Seed Script
 * Run: node seed.js   (from the backend/ directory)
 *
 * Creates 5 users, 10 posts with images, comments, likes, and friend connections.
 * Downloads post/ad images from Picsum Photos into the uploads/ directory.
 */

const path = require("path");
const fs = require("fs");
const https = require("https");
const http = require("http");
require("dotenv").config({ path: path.join(__dirname, ".env") });
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User");
const Post = require("./models/Post");

const UPLOADS_DIR = path.join(__dirname, "uploads");

// ─── Image download helper (follows redirects, 15s timeout) ──────────────────
function downloadImage(url, dest) {
  return new Promise((resolve, reject) => {
    if (fs.existsSync(dest) && fs.statSync(dest).size > 1000) {
      console.log(`  ✓ Already exists: ${path.basename(dest)}`);
      return resolve();
    }

    const TIMEOUT_MS = 15000;
    let settled = false;
    const settle = (fn, arg) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      fn(arg);
    };

    const timer = setTimeout(() => {
      if (fs.existsSync(dest)) try { fs.unlinkSync(dest); } catch {}
      settle(reject, new Error(`Timeout downloading ${path.basename(dest)}`));
    }, TIMEOUT_MS);

    const file = fs.createWriteStream(dest);

    const doGet = (targetUrl, redirects = 0) => {
      if (redirects > 5) return settle(reject, new Error("Too many redirects"));
      const proto = targetUrl.startsWith("https") ? https : http;
      proto.get(targetUrl, (res) => {
        if (res.statusCode === 301 || res.statusCode === 302 || res.statusCode === 307) {
          res.resume();
          return doGet(res.headers.location, redirects + 1);
        }
        if (res.statusCode !== 200) {
          res.resume();
          return settle(reject, new Error(`HTTP ${res.statusCode}`));
        }
        res.pipe(file);
        file.on("finish", () => {
          file.close();
          console.log(`  ↓ Downloaded: ${path.basename(dest)}`);
          settle(resolve);
        });
        file.on("error", (err) => settle(reject, err));
      }).on("error", (err) => settle(reject, err));
    };

    doGet(url);
  });
}

// ─── Images to download ───────────────────────────────────────────────────────
const IMAGES = [
  // Post images — specific Picsum IDs for consistent, themed photos
  { url: "https://picsum.photos/id/0/800/500",   dest: "post1.jpg"        }, // tech/laptop
  { url: "https://picsum.photos/id/180/800/500", dest: "post2.jpg"        }, // abstract/design
  { url: "https://picsum.photos/id/167/800/500", dest: "post3.jpg"        }, // golden hour / nature
  { url: "https://picsum.photos/id/453/800/500", dest: "post4.jpg"        }, // portrait
  { url: "https://picsum.photos/id/425/800/500", dest: "post5.jpg"        }, // coffee / lifestyle
  // Advertisement
  { url: "https://picsum.photos/id/292/600/300", dest: "ad-cosmetics.jpg" }, // beauty / cosmetics
];

// ─── Seed data ────────────────────────────────────────────────────────────────
const PASSWORD = "password123";

const USERS_DATA = [
  { firstName: "Alex",  lastName: "Johnson", email: "alex@example.com",  location: "San Francisco, CA", occupation: "Software Engineer"    },
  { firstName: "Maria", lastName: "Garcia",  email: "maria@example.com", location: "New York, NY",       occupation: "UI/UX Designer"       },
  { firstName: "James", lastName: "Chen",    email: "james@example.com", location: "Los Angeles, CA",    occupation: "Photographer"         },
  { firstName: "Emma",  lastName: "Wilson",  email: "emma@example.com",  location: "Austin, TX",         occupation: "Tech Journalist"      },
  { firstName: "Raj",   lastName: "Patel",   email: "raj@example.com",   location: "Seattle, WA",        occupation: "Startup Founder"      },
];

// POSTS_DATA uses user index (0–4) and optional picturePath filename
const POSTS_DATA = [
  {
    userIdx: 0, // Alex
    description:
      "Just deployed our new microservices architecture to production 🚀 Three months of hard work finally paying off. Response times dropped by 60%! Love working with such a talented team.",
    picturePath: "post1.jpg",
    likeIdxs: [1, 2],
    comments: [
      "Congrats! The new architecture is much cleaner 👏",
      "60% improvement is massive, well done!",
      "Can't wait to see the full benchmark report!",
    ],
  },
  {
    userIdx: 0, // Alex
    description:
      "Morning standup thought: Clean code is not just about aesthetics — it's about respect for your teammates and your future self. Write code that tells a story.",
    picturePath: "",
    likeIdxs: [3, 4],
    comments: [
      "Couldn't agree more!",
      "This hit different on a Monday morning ☕",
      "Sharing this with my entire team.",
    ],
  },
  {
    userIdx: 1, // Maria
    description:
      "After 3 iterations our new onboarding flow is finally live ✨ User drop-off rate reduced by 45%. Sometimes the best design is the one users don't even notice.",
    picturePath: "post2.jpg",
    likeIdxs: [0, 3, 4],
    comments: [
      "The new flow is so much smoother!",
      "45% reduction is incredible, Maria 🎉",
      "Great UX research behind this — it shows.",
      "Setting a new standard for the team!",
    ],
  },
  {
    userIdx: 1, // Maria
    description:
      "Pro tip: When you're stuck on a design problem, take a walk. Your best ideas rarely come staring at a screen. Came back to my desk with the perfect solution for our dashboard layout.",
    picturePath: "",
    likeIdxs: [2, 0],
    comments: [
      "This is so true!",
      "Fresh air is criminally underrated in design",
      "The dashboard looks 🔥 by the way",
    ],
  },
  {
    userIdx: 2, // James
    description:
      "Golden hour magic in downtown LA ✨ Spent 4 hours chasing this light and it was absolutely worth every second. Sometimes patience is the only skill you need as a photographer.",
    picturePath: "post3.jpg",
    likeIdxs: [1, 0, 3, 4],
    comments: [
      "Stunning shot James! The colors are unreal 😍",
      "What camera and lens setup are you using?",
      "This deserves so many more likes!",
      "The composition is perfect, golden hour magic indeed.",
    ],
  },
  {
    userIdx: 2, // James
    description:
      "New portrait project dropping soon. Been working with incredible subjects who have amazing stories to tell. Photography is just the medium — the real art is listening.",
    picturePath: "post4.jpg",
    likeIdxs: [0, 3],
    comments: [
      "Can't wait to see it! Your portraits always tell such deep stories.",
      "Listening first — that's the real craft.",
    ],
  },
  {
    userIdx: 3, // Emma
    description:
      "Just published my deep dive on how AI is reshaping content creation. The most surprising finding? 78% of journalists say AI made them MORE creative, not less. Full article linked in bio.",
    picturePath: "",
    likeIdxs: [0, 1, 4],
    comments: [
      "Great perspective — bookmarked immediately!",
      "The stats are really eye-opening Emma",
      "Counter-intuitive but makes total sense when you think about it.",
    ],
  },
  {
    userIdx: 3, // Emma
    description:
      "Coffee shop office day ☕ There's something about ambient noise that makes writing flow so much better. What's your ideal writing environment?",
    picturePath: "post5.jpg",
    likeIdxs: [1, 2],
    comments: [
      "Totally agree — ambient noise is scientifically proven to help!",
      "I need complete silence honestly lol",
      "Coffee shop gang represent! ✊",
      "I write best at 2am with lo-fi music 😅",
    ],
  },
  {
    userIdx: 4, // Raj
    description:
      "We just closed our $2M seed round! 🎉 Grateful for every early believer, advisor, and team member who saw the vision before the numbers did. The startup journey is wild — this is just the beginning.",
    picturePath: "",
    likeIdxs: [0, 1, 2, 3],
    comments: [
      "Congratulations!!! Huge milestone! 🚀",
      "Well deserved Raj — we always believed!",
      "Excited to see where you take this. Onwards! 💪",
      "Inspiring journey, keep sharing the learnings!",
    ],
  },
  {
    userIdx: 4, // Raj
    description:
      "Startup lesson #47: You don't build a company, you build a team that builds a company. Hire slow, fire fast, and never compromise on culture. The product will evolve but culture is the foundation everything else rests on.",
    picturePath: "",
    likeIdxs: [0, 3],
    comments: [
      "Sharing this with my co-founders immediately.",
      "Culture really is everything — seen it firsthand.",
      "Hire slow, fire fast. Classic but eternally true.",
    ],
  },
];

// Friend pairs (by user index — bidirectional)
const FRIEND_PAIRS = [
  [0, 1], [0, 2], [0, 4],
  [1, 3], [1, 2],
  [2, 4],
];

// ─── Main ─────────────────────────────────────────────────────────────────────
async function seed() {
  console.log("\n🌱  Connectify Seed Script");
  console.log("══════════════════════════════════\n");

  // 1. Connect to MongoDB
  console.log("📡 Connecting to MongoDB...");
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("   Connected ✓\n");

  // 2. Download images
  console.log("📥 Downloading images...");
  for (const { url, dest } of IMAGES) {
    await downloadImage(url, path.join(UPLOADS_DIR, dest)).catch((err) =>
      console.warn(`   ⚠ Skipped ${dest}: ${err.message}`)
    );
  }
  console.log();

  // 3. Clear existing seed data (users with seed emails, and their posts)
  console.log("🗑  Clearing existing seed data...");
  const seedEmails = USERS_DATA.map((u) => u.email);
  const existingUsers = await User.find({ email: { $in: seedEmails } });
  const existingIds = existingUsers.map((u) => u._id);
  await Post.deleteMany({ userId: { $in: existingIds } });
  await User.deleteMany({ email: { $in: seedEmails } });
  console.log(`   Removed ${existingUsers.length} existing seed users and their posts ✓\n`);

  // 4. Create users
  console.log("👤 Creating users...");
  const hashedPassword = await bcrypt.hash(PASSWORD, 10);
  const users = await User.insertMany(
    USERS_DATA.map((u) => ({
      ...u,
      password: hashedPassword,
      viewedProfile: Math.floor(Math.random() * 500) + 50,
      impressions: Math.floor(Math.random() * 2000) + 100,
    }))
  );
  users.forEach((u) => console.log(`   ✓ ${u.firstName} ${u.lastName} (${u.email})`));
  console.log();

  // 5. Set up friends
  console.log("🤝 Setting up friendships...");
  for (const [a, b] of FRIEND_PAIRS) {
    users[a].friends.push(users[b]._id);
    users[b].friends.push(users[a]._id);
  }
  for (const user of users) {
    await user.save();
  }
  console.log(`   ${FRIEND_PAIRS.length} friend pairs created ✓\n`);

  // 6. Create posts
  console.log("📝 Creating posts...");
  for (const p of POSTS_DATA) {
    const author = users[p.userIdx];
    const likesMap = {};
    p.likeIdxs.forEach((i) => {
      likesMap[users[i]._id.toString()] = true;
    });

    await Post.create({
      userId: author._id,
      firstName: author.firstName,
      lastName: author.lastName,
      location: author.location,
      description: p.description,
      picturePath: p.picturePath || "",
      userPicturePath: author.picturePath || "",
      likes: likesMap,
      comments: p.comments,
    });

    console.log(`   ✓ "${p.description.slice(0, 55)}..."`);
  }
  console.log();

  // 7. Done
  console.log("══════════════════════════════════");
  console.log("✅  Seed complete!");
  console.log(`   Users  : ${users.length}`);
  console.log(`   Posts  : ${POSTS_DATA.length}`);
  console.log(`   Friends: ${FRIEND_PAIRS.length} pairs`);
  console.log("\n   Login credentials (all users):");
  console.log(`   Password: ${PASSWORD}`);
  users.forEach((u) => console.log(`   • ${u.email}`));
  console.log();

  await mongoose.disconnect();
  process.exit(0);
}

seed().catch((err) => {
  console.error("\n❌  Seed failed:", err.message);
  mongoose.disconnect().finally(() => process.exit(1));
});
