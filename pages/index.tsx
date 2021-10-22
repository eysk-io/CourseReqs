import styles from '../styles/Home.module.css'
import { useRouter } from 'next/router'

export default function Home() {
  const router = useRouter()
  const inputs = ["school", "subject", "code"]

  const capitalizeFirstLetter = (s: string): string => {
    return s.charAt(0).toUpperCase() + s.slice(1);
  }

  const handleSubmit = (e): void => {
    e.preventDefault()
    const school = e.target.elements.school.value
    const subject = e.target.elements.subject.value
    const code = e.target.elements.code.value
    router.push(`/${school}/${subject}/${code}`)
  }

  return (
    <div className={styles.container}>
      <h1>Home Page</h1>
      <form onSubmit={e => handleSubmit(e)}>
        {
          inputs.map((input, index) => (
              <div key={index}>
                <label 
                  key={index + 10}
                  htmlFor={input}
                >
                  {capitalizeFirstLetter(input)}: 
                </label>
                <input 
                  key={index + 20}
                  type="text" 
                  id={input} 
                  name={input} 
                />
              </div>
            ))
        }
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}
