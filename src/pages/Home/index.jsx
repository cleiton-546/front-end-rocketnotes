import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { FiPlus, FiSearch } from 'react-icons/fi';

import { api } from "../../services/api";

import { Container, Brand, Menu, Search, Content, NewNote } from './style';

import { Header } from '../../components/header';
import { Input } from '../../components/input';
import { Note } from '../../components/note';
import { Section } from '../../components/section';
import { ButtonText } from '../../components/buttonText';



export function Home() {
    const [search, setSearch] = useState("");
    const [tags, setTags] = useState([]);
    const [tagsSelected, setTagsSelected] = useState([]);
    const [notes, setNotes] = useState([]);

    const navigate = useNavigate();
    

    function handleTagsSelected( tagName ) {
        if(tagName === "all") {
            return setTagsSelected([])
        }


        const alreadySelected = tagsSelected.includes(tagName);

        if ( alreadySelected ) {
            const filteredTags = tagsSelected.filter(tag => tag !== tagName );
            setTagsSelected(filteredTags)
        } else {
            setTagsSelected(prevState => [...prevState, tagName]);
        }
    }

    function handleDetails(id) {
        navigate(`/details/${id}`)
    }

    useEffect(() => {
        async function fetchTags() {
            const response = await api.get("/tags");
            setTags(response.data);
        }

        fetchTags();
    }, []); 

    useEffect(() => {
        async function fetchNotes() {
            const response = await api.get(`/notes?title=${search}&tags=${tagsSelected}`);
            setNotes(response.data);
        }
        fetchNotes();
    }, [tagsSelected, search])

    return (
        <Container>
            <Brand>
                <h1>RocketNotes</h1>
            </Brand>

            <Header />

            <Menu>
                <li><ButtonText 
                title="Todos"
                onClick={() => handleTagsSelected("all") }
                $isActive={tagsSelected.length === 0}
                /></li>
                {
                    tags && tags.map(tag => (
                      <li key={String(tag.id)}>
                        <ButtonText 
                          title={tag.name}
                          onClick={() => handleTagsSelected(tag.name)}
                          $isActive={tagsSelected.includes(tag.name)}
                          
                        />
                        </li>  
                    ))
                }
            </Menu>

            <Search>
                <Input 
                placeholder="Pesquisar pelo titulo"
                icon={FiSearch}
                onChange={(e) => setSearch(e.target.value)}
                />
            </Search>

            <Content>
                <Section title="Minhas Notas">
                    {
                        notes.map(note => (
                            <Note 
                            key={String(note.id)}
                            data={note}
                            onClick={() => handleDetails(note.id)}
                            />
                        ))
                    }
                </Section>
            </Content>

            <NewNote to="/new">
                <FiPlus />
                Criar nota
            </NewNote>

        </Container>
    );
}