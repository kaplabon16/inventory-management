// backend/config/passport.js
import passport from 'passport'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import { Strategy as GitHubStrategy } from 'passport-github2'
import { prisma } from './db.js'

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
        let email = profile.emails?.[0]?.value
        if (!email) email = `${profile.username}@github.com` // fallback
        let user = await prisma.user.findUnique({ where: { email } })

        if (!user) {
          user = await prisma.user.create({
            data: {
              email,
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

/* ----------------- Sessions ----------------- */
passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
  try {
    const user = await prisma.user.findUnique({ where: { id } })
    done(null, user)
  } catch (err) {
    done(err, null)
  }
})

export default passport
