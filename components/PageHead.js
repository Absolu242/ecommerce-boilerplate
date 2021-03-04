import Head from "next/head"

export default function PageHead({ title }) {
  return (
    <Head>
      <title>{title}</title>
    </Head>
  )
}
