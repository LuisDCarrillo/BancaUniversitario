import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getContactsListAPI, deleteContactAPI, getContactByAliasAPI } from '../services/contacts/Contacts.Service';
import DeleteConfirmationPopup from './DeleteConfirmationPopup';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 90%;
  margin: 20px auto;
  font-family: 'Montserrat Alternates', sans-serif;
  position: relative;
  margin-bottom: 230px;
`;

const SearchInput = styled.input`
  width: 100%;
  max-width: 400px;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  outline: none;
  box-shadow: inset 0px 2px 4px rgba(0, 0, 0, 0.1);

  &::placeholder {
    color: #aaa;
  }
`;

const TableWrapper = styled.div`
  background-color: #ffffff;
  border-radius: 15px;
  padding: 20px;
  width: 100%;
  max-width: 900px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid #085f63;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  text-align: left;
`;

const TableHeader = styled.thead`
  background-color: #49beb7;

  th {
    padding: 18px;
    color: #ffffff;
    font-size: 22px;
    font-weight: bold;
    text-align: center;
  }
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f9f9f9;
  }

  &:hover {
    background-color: #e0f7fa;
    cursor: pointer;
  }
`;

const TableData = styled.td`
  padding: 16px;
  font-size: 20px;
  color: #333;
  text-align: center;
`;

const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const Icon = styled.img`
  width: 32px;
  height: 32px;
  cursor: pointer;
`;

const Title = styled.h2`
  margin-bottom: 20px;
  color: #085f63;
  font-weight: bold;
  font-size: 24px;
`;

const Contacts = ({ onEditContact, onTransfer }) => {
  const [contacts, setContacts] = useState([]);
  const [error, setError] = useState('');
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [contactToDelete, setContactToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await getContactsListAPI();
        setContacts(response.data?.data || []);
      } catch (error) {
        console.error('Error fetching contacts:', error);
        setError('Error al obtener los contactos');
      }
    };

    fetchContacts();
  }, []);

  useEffect(() => {
    const fetchContactsByAlias = async () => {
      if (searchTerm.trim() === '') {
        const response = await getContactsListAPI();
        setContacts(response.data?.data || []);
      } else {
        try {
          const response = await getContactByAliasAPI(searchTerm);
          setContacts(response.data?.data || []);
        } catch (error) {
          console.error('Error fetching contacts by alias:', error);
          setError('Error al buscar contactos');
        }
      }
    };

    fetchContactsByAlias();
  }, [searchTerm]);

  const handleDeleteClick = (contactId) => {
    setContactToDelete(contactId);
    setShowDeletePopup(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteContactAPI(contactToDelete);
      setContacts(contacts.filter(contact => contact.id !== contactToDelete));
      setShowDeletePopup(false);
      setContactToDelete(null);
    } catch (error) {
      console.error('Error deleting contact:', error);
      setError('Error al eliminar el contacto');
    }
  };

  const handleCancelDelete = () => {
    setShowDeletePopup(false);
    setContactToDelete(null);
  };

  const handleRowClick = (accountNumber) => {
    if (typeof onTransfer === 'function') {
      onTransfer(accountNumber);
    }
  };

  return (
    <>
      <Container>
        <Title>Contactos</Title>
        <SearchInput
          type="text"
          placeholder="Buscar por alias"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <TableWrapper>
          {error && <p>{error}</p>}
          <Table>
            <TableHeader>
              <tr>
                <th>Alias</th>
                <th>Descripción</th>
                <th>Número de Cuenta</th>
                <th>Acciones</th>
              </tr>
            </TableHeader>
            <tbody>
              {contacts.length > 0 ? (
                contacts.map((contact, index) => (
                  <TableRow key={index} onClick={() => handleRowClick(contact.account_number)}>
                    <TableData>{contact.alias}</TableData>
                    <TableData>{contact.description}</TableData>
                    <TableData>{contact.account_number}</TableData>
                    <TableData>
                      <IconWrapper>
                        <Icon
                          src="/editar.png"
                          alt="Editar"
                          onClick={(e) => {
                            e.stopPropagation();
                            onEditContact(contact.id);
                          }}
                        />
                        <Icon
                          src="/basura.png"
                          alt="Eliminar"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteClick(contact.id);
                          }}
                        />
                      </IconWrapper>
                    </TableData>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableData colSpan="4">No hay contactos disponibles</TableData>
                </TableRow>
              )}
            </tbody>
          </Table>
        </TableWrapper>
      </Container>
      {showDeletePopup && (
        <DeleteConfirmationPopup
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
    </>
  );
};

export default Contacts;