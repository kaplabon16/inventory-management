// File: config/passport.js
import passport from 'passport'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import { Strategy as GitHubStrategy } from 'passport-github2'
import prisma from '/backend/prismaClient' // Make sure this path is correct

// Serialize user to store in session
passport.serializeUser((user, done) => {
  done(null, user.id)
})

// Deserialize user from session
passport.deserializeUser(async (id, done) => {
  try {
    const user = await prisma.user.findUnique({ where: { id } })
    done(null, user)
  } catch (err) {
    done(err, null)
  }
})

/* ----------------- Google OAuth ----------------- */
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await prisma.user.findUnique({
          where: { email: profile.emails[0].value }
        })

        if (!user) {
          user = await prisma.user.create({
            data: {
              email: profile.emails[0].value,
              name: profile.displayName,
              provider: 'google',
              avatar: profile.photos[0]?.value
            }
          })
        }

        done(null, user)
      } catch (err) {
        done(err, null)
      }
    }
  )
)

/* ----------------- GitHub OAuth ----------------- */
passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_CALLBACK
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await prisma.user.findUnique({
          where: { email: profile.emails[0].value }
        })

        if (!user) {
          user = await prisma.user.create({
            data: {
              email: profile.emails[0].value,
              name: profile.displayName || profile.username,
              provider: 'github',
              avatar: profile.photos[0]?.value
            }
          })
        }

        done(null, user)
      } catch (err) {
        done(err, null)
      }
    }
  )
)

export default passport
