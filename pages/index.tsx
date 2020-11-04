import Link from 'next/link'
import styles from '../styles/Home.module.scss'

const BLOG_URL = 'https://anarabaidulla.ghost.io'
const CONTENT_API_KEY = 'd288a844f703d06d4af0dc3290'

type Post = {
  title: string
  slug: string
}

async function getPosts() {
  const res =  await fetch(
    `${BLOG_URL}/ghost/api/v3/content/posts/?key=${CONTENT_API_KEY}&fields=title,slug,custom_excerpt`
  ).then((res) => res.json())

  const posts = res.posts

  console.log(posts)

  return posts
}

export const getStaticProps = async ({ params }) => {
  const posts = await getPosts()
  return {
    props: { posts }
  }
}

const Home: React.FC<{ posts: Post[] }> = (props) => {
  const { posts } = props

  return (
    <div className={styles.container}>
      <h1>Hi</h1>
      <ul>
        {posts.map((post, index) =>{
          return (
            <li key={index}>
              <Link href="/post/[slug]" as={`/post/${post.slug}`}>
                <a> {post} </a>
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default Home