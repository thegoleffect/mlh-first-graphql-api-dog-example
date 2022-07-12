import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home() {
	return (
		<div className={styles.container}>
			<Head>
				<title>Dog API Example | MLH First GraphQL API</title>
			</Head>

			<main className={styles.main}>
				<h1 className={styles.title}>
					<img src="/mlh-logo.png" width="50%" />
				</h1>
				<a href="/api/gql">Click here for GraphQL API</a>
			</main>

			<footer className={styles.footer}>
				<a href="https://next.new" target="_blank" rel="noopener noreferrer">
					Created with&nbsp;<b>next.new</b>&nbsp;⚡️
				</a>
			</footer>
		</div>
	)
}
