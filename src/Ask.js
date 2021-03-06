import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default function Ask () {
  const URL = 'HTTP://localhost/verkkokauppa/'
  const [items, setItems] = useState([])
  const { it } = useParams()
  const [nimi, setNimi] = useState('')
  const [puhelin, setPuhelin] = useState('')
  const [sahkoposti, setSahkoposti] = useState('')
  const [aihe, setAihe] = useState('')
  const [viesti, setViesti] = useState('')

  useEffect(() => {
    let status = 0
    fetch(URL + 'retrieve.php', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        search: it
      })
    })
      .then(response => {
        status = parseInt(response.status)
        return response.json()
      })
      .then(
        response => {
          if (status === 200) {
            setItems(response)
          } else {
            alert(response.error)
          }
        },
        error => {
          alert(error)
        }
      )
  }, [it])

  const lähetä = e => {
    e.preventDefault()
    axios
      .post('http://localhost/verkkokauppa/ask.php', {
        nimi: nimi,
        tuoteid: it,
        puhelin: puhelin,
        sahkoposti: sahkoposti,
        aihe: aihe,
        viesti: viesti
      })
      .then(response => {
        console.log(response)
        alert('Kysymys lähetetty')
        window.location.href = 'http://localhost:3000/product/' + it
      })
  }

  return (
    <div className='row'>
      <div className='bg-light'>
        {items.map(item => (
          <div className='' key={item.id}>
            <div>
              <div className='priceinfo mt-2 mb-2'>
                <h2 className='ms-4 title'>{item.tuotenimi}</h2>
                <div className='row'>
                  <div className='col-lg-4 col-md-4 col-sm-6'>
                    <img
                      src={item.kuva}
                      className='tuotesivukuva col-sm-10 col-md-10 col-sm-10 col-10 img-fluid'
                      alt='Logo'
                    />
                  </div>

                  <div className='col-lg-8 col-md-8'>
                    <h3>Kysy tuotteesta</h3>
                    <form onSubmit={lähetä}>
                      <div className='row'>
                        <div className='mb-3 col-5'>
                          <label for='nimi' className='form-label'>
                            Nimi
                          </label>
                          <input
                            onChange={e => setNimi(e.target.value)}
                            type='text'
                            placeholder='Etu ja sukunimi'
                            className='form-control col-2'
                            id='nimi'
                            required
                          />
                        </div>

                        <div className='mb-3 col-5'>
                          <label for='puhelin' className='form-label '>
                            Puhelin
                          </label>
                          <input
                            onChange={e => setPuhelin(e.target.value)}
                            type='text'
                            placeholder='Puhelin'
                            className='form-control'
                            id='puhelin'
                            required
                          />
                        </div>

                        <div className='mb-3 col-10'>
                          <label for='exampleInputEmail1' className='form-label'>
                            Sähköpostiosoite
                          </label>
                          <input
                            onChange={e => setSahkoposti(e.target.value)}
                            type='email'
                            placeholder='Sähköpostiosoite'
                            className='form-control'
                            id='exampleInputEmail1'
                            aria-describedby='emailHelp'
                            required
                          />
                        </div>

                        <div className='mb-3 col-10'>
                          <label for='aihe' className='form-label'>
                            Aihe
                          </label>
                          <input
                            onChange={e => setAihe(e.target.value)}
                            type='text'
                            placeholder='Aihe'
                            className='form-control'
                            id='aihe'
                            required
                          />
                        </div>

                        <div className='mb-3 col-10'>
                          <label for='viesti' className='form-label'>
                            Viesti
                          </label>
                          <textarea
                            onChange={e => setViesti(e.target.value)}
                            placeholder='Viesti'
                            className='form-control'
                            id='viesti'
                            required
                          />
                          <button
                            type='submit'
                            className='btn btn-primary my-4'
                          >
                            Lähetä
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
