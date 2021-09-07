import { server } from '../../../config'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Meta from '../../../components/Meta'

export default function article({article}) {
  // const router = useRouter()
  // const {id} = router.query

  return (
    <>
      <Meta title={article.title} description={article.excerpt}/>
      <h1>{article.title}</h1>
      <p>{article.body}</p>
      <br />
      <Link href='/'>Go back</Link>
    </>
  )
}

export const getStaticProps = async (context) => {
  const res = await fetch(`${server}/api/articles/${context.params.id}`)

  const article = await res.json()

  return {
    props: {
      article
    }
  }
}

export const getStaticPaths = async () => {
  const res = await fetch(`${server}/api/articles`)

  const articles = await res.json()

  const ids = articles.map(article => article.id)
  const paths = ids.map(id => ({params: {id: id.toString()}}))

  return {
    paths,
    fallback: false,
  }
}

// export const getStaticProps = async (context) => {
//   const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${context.params.id}`)

//   const article = await res.json()

//   return {
//     props: {
//       article
//     }
//   }
// }

// export const getStaticPaths = async () => {
//   const res = await fetch(`https://jsonplaceholder.typicode.com/posts`)

//   const articles = await res.json()

//   const ids = articles.map(article => article.id)
//   const paths = ids.map(id => ({params: {id: id.toString()}}))

//   return {
//     paths,
//     fallback: false,
//   }
// }

/*
지금 이 getServerSideProps를 통해 얻는 데이터는
Index -> ArticleList -> ArticleItem에서 디스플레이 되는 것이고
url이 /article/[id] 인 곳에 들어갈 때마다 매번 요청이 되어서 오는 것임

*/