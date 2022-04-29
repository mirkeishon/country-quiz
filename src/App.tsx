import axios from "axios";
import image1 from './assets/undraw_adventure_4hum 1.svg'
import image2 from './assets/undraw_winners_ao2o 2.svg'
import { useEffect, useState } from "react";
import { MdCheckCircleOutline, MdOutlineCancel } from 'react-icons/md'

const questions = ['capital', 'flag']
const letters = ['A', 'B', 'C', 'D']

interface options{
  country: string;
  style: string;
  icon: any;
}

function App() {
  const [btn, setBtn] = useState('')
  const [data, setData] = useState<any>([])
  const [options, setOptions] = useState<options[]>([])
  const [question, setQuestion] = useState<string>('')
  const [flag, setFlag] = useState<string>('')
  const [answer, setAnswer] = useState('')
  const [disabled, setDisabled] = useState(false)
  const [answered, setAnswered] = useState(0)
  const [loading, setLoading] = useState(true)


  const getCountries = async ()=>{
    try {
      const {data} = await axios.get('https://restcountries.com/v3.1/all')
      setData(data)
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
    
  }

  useEffect(()=>{
    getCountries()    
  }, [])

  useEffect(()=>{
    if(data.length > 0){
      getCountry()
    }
  }, [data])

  const getAnswer = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setDisabled(true)
    if(event.currentTarget.id === answer){
      const newOptions = options.map((option:options)=>{
        const { country } = option;
        if(country === answer){
          return {
            country,
            style: 'text-white bg-green-400 border-green-400',
            icon: <MdCheckCircleOutline className="text-4xl"/>
          }
        }
        return option
      })
      setOptions(newOptions)
    }
    if(event.currentTarget.id !== answer){
      const newOptions = options.map((option:options)=>{
        const { country } = option;
        if(country === answer){
          return {
            country,
            style: 'text-white bg-green-400 border-green-400',
            icon: <MdCheckCircleOutline className="text-4xl"/>
          }
        }
        if(country === event.currentTarget.id){
          return {
            country,
            style: 'text-white bg-red-400 border-red-400',
            icon: <MdOutlineCancel className="text-4xl"/>
          }
        }
        return option
      })
      setOptions(newOptions)
    }
  }

  const getQuestion = () => {
    const item: string = questions[Math.floor(Math.random()*questions.length)] 
    return item
  }

  const randomizeOptions = (options: any) =>{
    let newArray = [...options]
    for(let i = newArray.length - 1; i > 0; i--){
      const j = Math.floor(Math.random() * (i + 1));
      const temp = newArray[i];
      newArray[i] = newArray[j];
      newArray[j] = temp
    } 
    setOptions(newArray)
  }

  const getOptions = (country: string) => {
    let options: options[] = []
    options.push(
      {
        country: country,
        style: 'group hover:bg-yellow-500 hover:border-yellow-500 text-indigo-400 border-indigo-400',
        icon: ''
      }
      )
    while(options.length < 4){
      let option = data[Math.floor(Math.random()*data.length)].name.common
      options.push(
        {
          country: option,
          style:'group hover:bg-yellow-500 hover:border-yellow-500 text-indigo-400 border-indigo-400',
          icon: ''
        }
      ) 
    }
    randomizeOptions(options)    
  }

  const getCountry = () => {
    const country = data[Math.floor(Math.random()*data.length)]
    const question = getQuestion();
    getOptions(country.name.common)
    setAnswer(country.name.common)
    setBtn('')
    setDisabled(false)
    if(question === 'flag'){
      if(country.flags.png !== undefined){
        setFlag(country.flags.png)
        setQuestion(`Which country does this flag belongs to?`)
      }else{
        setFlag('')
        setQuestion(`${country.capital[0]} is the capital of`)
      } 
    }
    if(question === 'capital'){
      setFlag('')
      setQuestion(`${country.capital[0]} is the capital of`)
    }
    
  }
  if(loading){
    return <div className="w-full max-w-[460px] relative left-0 right-0 my-28 pt-16 m-auto">
        <div className=" px-8 pt-14 pb-10 rounded-2xl w-full bg-white">
          <div className="flex justify-center">
            <div className="animate-spin w-32 h-32 rounded-full border-4 border-t-yellow-400"></div>
          </div> 
        </div>
    </div>
  }

  if(btn === 'Try Again')
    return (
      <div className="w-full max-w-[460px] relative left-0 right-0 my-28 pt-16 m-auto">
        <div className=" px-8 pt-14 pb-10 rounded-2xl w-full bg-white">
          <div className="flex justify-center">
            <img src={image2} alt="" />
          </div>
          <div className="text-center mt-12">
            <h1 className="text-4xl text-cyan-900 font-bold mb-5">Results</h1>
            <p className="text-lg">You got <span className="text-4xl text-green-400 font-bold">{answered}</span> correct answers</p>
          </div>
          <div className="flex justify-center mt-16">
            <button onClick={()=>{
              getCountry()
              setAnswered(0)}} className="border-cyan-900 border text-cyan-900 font-bold py-3 px-12 rounded-lg">
            {btn}
            </button>
          </div>
        </div>
      </div>
      )

  return (
    <div className="w-full max-w-[460px] relative left-0 right-0 my-28 pt-16 m-auto">
      <div className="absolute w-full sm:px-0 px-2 z-50 flex top-0 justify-between">
        <h1 className="text-white sm:text-4xl text-2xl text-center font-bold">COUNTRY QUIZ</h1>
        <img className=" w-40" src={image1} alt="" />
      </div>
      <div className=" px-8 pt-14 pb-10 rounded-2xl w-full bg-white">
        {flag &&
          <img className="w-32" src={flag} alt="" />}
        <h2 className="mt-4 text-cyan-900 font-bold text-2xl mb-3">{question}</h2>
        {options.map((option: options, index: number) => {
          return (
            <div onClick={(event) => {
              if (!disabled) {
                getAnswer(event);
                if (event.currentTarget.id === answer) {
                  setAnswered(answered + 1);
                  setBtn('Next');
                } else {
                  setBtn('Results');
                }
              }
            } } id={option.country} key={index} className={`flex items-center w-full px-3 py-3 mt-5 space-x-10 rounded-lg cursor-pointer group font-medium border-2 ${option.style}`}>
              <p className="group-hover:text-white text-2xl">{letters[index]}</p>
              <p className="group-hover:text-white text-lg w-full">{option.country}</p>
              {option.icon && option.icon}
            </div>
          );
        })}

        {btn &&
          <div className="flex justify-end mt-5">
            {btn === 'Next' &&
              <button onClick={() => { getCountry(); } } className="bg-yellow-500 text-white font-bold py-4 px-8 rounded-lg">
                {btn}
              </button>}
            {btn === 'Results' &&
              <button onClick={() => { setBtn('Try Again'); } } className="bg-yellow-500 text-white font-bold py-4 px-8 rounded-lg">
                {btn}
              </button>}
          </div>}

      </div>
    </div>

  );
}

export default App;
