import { AiFillGithub, AiOutlineSlack,AiOutlineLinkedin } from 'react-icons/ai';
import './index.css'

export default function AboutLinks() {
  const githubLinks = [
    'https://github.com/hunter12756',
  ];

  const pfp = [
    'https://ubereats-clone.s3.amazonaws.com/d791caca54574fccabc194f09a3c8641.png',

  ];

  const slackLinks = [
    'https://app-academy.slack.com/team/U04KJHDQG6S',
  ];
  const linkedLinks=[
    'www.linkedin.com/in/hunter-watson-050a0521b'
  ]
  return (
    <>
      <h1 id='author'>Author: </h1>
      <div id='about'>
        {githubLinks.map((link, index) => (
          <div key={index} className='item'>
            <img src={pfp[index]} alt="Profile" className="pfp" />
            <a href={link} target="_blank" rel="noreferrer">
              <AiFillGithub size={24} />
            </a>
            <a href={slackLinks[index]} target="_blank" rel="noreferrer">
              <AiOutlineSlack size={24} />
            </a>
            <a href={linkedLinks[index]} target="_blank" rel="noreferrer">
              <AiOutlineLinkedin size={24} />
            </a>
          </div>
        ))}
      </div>
    </>
  )
}
