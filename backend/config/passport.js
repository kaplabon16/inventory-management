import passport from 'passport'
import GoogleStrategy from 'passport-google-oauth20'
import GitHubStrategy from 'passport-github2'
import { prisma } from './db.js'

passport.use(new GoogleStrategy.Strategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/api/auth/google/callback'
}, async (accessToken, refreshToken, profile, done) => {
  const user = await prisma.user.upsert({
    where: { googleId: profile.id },
    update: { name: profile.displayName },
    create: { googleId: profile.id, name: profile.displayName, email: profile.emails[0].value }
  })
  done(null, user)
}))

passport.use(new GitHubStrategy.Strategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: '/api/auth/github/callback'
}, async (accessToken, refreshToken, profile, done) => {
  const user = await prisma.user.upsert({
    where: { githubId: profile.id },
    update: { name: profile.displayName || profile.username },
    create: { githubId: profile.id, name: profile.displayName || profile.username, email: profile.emails[0].value }
  })
  done(null, user)
}))
