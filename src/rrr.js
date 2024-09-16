// Register Records Remove, by yuriy_nesterenko

// const axios = require('axios');
import axios from 'axios';

const keyId = 2805; // !!! 1. DO NOT DELETE wrong registers 😁
const limit = 10000; // 2. Up to 10000 recommended
const token = ``; // 3. Valid token
const authority = 'cabinet-bpmn-diia-stg.kitsoft.kiev.ua'; // 4. Proper API link
// Наприклад, const authority = 'cabinet-api-bpmn-sportsporudy-stg.kitsoft.kiev.ua';


const origin = `https://${authority}`;
const referer = `${origin}/`;


const getAllRecords = async () => {
  try {
    const responce = await axios({
      method: 'get',
      url: `${origin}/registers/keys/${keyId}/records?offset=0&limit=${limit}`,
      headers: {
          'authority': `${authority}`,
          'accept': '*/*',
          'accept-language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7',
          'cache-control': 'no-cache',
          'content-type': 'application/json',
          'origin': `${origin}`,
          'pragma': 'no-cache',
          'referer': `${referer}`,
          'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="100", "Google Chrome";v="100"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-site',
          'token': `${token}`,
          'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.60 Safari/537.36'
      }
  });
  return responce.data.data;
  } catch (error) {
    console.log('--getAllRecords--error--',error);
  }
    
};

const deleteRecords = async () => {
    const records = await getAllRecords();
    const recordsId = records.map(({id}) => id);
    let counter = 1;
    
    for (const recId of recordsId) {
          try {
            const deleteRes = await axios({
              method: 'delete',
              url: `${origin}/registers/keys/${keyId}/records/${recId}`,
              headers: { 
                'authority': `${authority}`,
                'accept': '*/*', 
                'accept-language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7', 
                'cache-control': 'no-cache', 
                'content-type': 'application/json', 
                'origin': `${origin}`,
                'pragma': 'no-cache', 
                'referer': `${referer}`,
                'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="100", "Google Chrome";v="100"', 
                'sec-ch-ua-mobile': '?0', 
                'sec-ch-ua-platform': '"Windows"', 
                'sec-fetch-dest': 'empty', 
                'sec-fetch-mode': 'cors', 
                'sec-fetch-site': 'same-site', 
                'token': `${token}`,
                'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.60 Safari/537.36'
              }
          });
            console.log(`${JSON.stringify(deleteRes.data)} | record number: ${counter}`);
            counter++;
          } catch (error) {
            console.log('--deleteRecords--error--',error);
          }  
    }
};

deleteRecords();
