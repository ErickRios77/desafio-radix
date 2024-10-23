import { ApolloServer } from '@apollo/server';
import { gql } from 'graphql-tag';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import connection from '@/app/database/connection';
import { DateTimeResolver } from 'graphql-scalars';

// Schema/estrutura da tabela
const typeDefs = gql`
    scalar DateTime

    type Usuario{
        idUsuario: Int!
        nome: String!
        senha: String!
        sensores: [Sensor!]!
    }

    type Sensor{
        equipmentID: String!
        responsavel: Usuario!
        leituras: [Leitura!]!
    }
    
    type Leitura{
        id: Int!
        sensor: Sensor! 
        dataLeitura: DateTime
        valor: Float
    }

    type Kpi{
        media1d: Float
        media2d: Float
        media7d: Float
        media30d: Float
    }

    type Query{
        usuarios:[Usuario!]!
        usuario(idUsuario:Int!):Usuario

        sensores:[Sensor!]!
        sensor(equipmentID: String!):Sensor

        leituras(offset:Int!,limit:Int!):[Leitura]
        leitura(id:Int!): Leitura
        leiturasFiltroData(intervalo:Int!) : [Leitura]
        leiturasRecentes:[Leitura]
        kpisMedia: Kpi
    }

    input dadosInsert{
        equipmentID:String!,
        dataLeitura:DateTime!,
        valor:Float!
    }

    type Mutation{
        insertLeituras(leituras:[dadosInsert]!):[Leitura]
    }
`;

const resolvers = {
    DateTime: DateTimeResolver,
    Query: {
        leituras: async (_,{limit, offset}) => {
            try{
                const [rows] = await connection.query('SELECT * FROM leitura ORDER BY dataLeitura DESC LIMIT ? OFFSET ?', [limit, offset]);
                return rows;
            } catch (error) {
                console.error('Erro em buscar as leituras:', error);
                throw new Error('Falhou em buscar as leituras');
            }
        },
        leitura: async (_,{id}) => {
            try {
                const [rows] = await connection.query('SELECT * FROM leitura WHERE id = ?', [id]);
                return rows[0];
            } catch (error) {
                console.error(`Erro buscando leitura com ID ${id}:`, error);
                throw new Error(`Falhou em buscar leitura com ID ${id}`);
            }
        },
        leiturasFiltroData: async (_,{intervalo}) => {
            try {
                const [rows] = await connection.query('SELECT * FROM leitura WHERE DATE(dataLeitura) >= (CURDATE()-INTERVAL ? DAY) ORDER BY dataLeitura DESC', [intervalo])
                return rows;
            } catch (error) {
                console.error('Erro buscando leitura dentro da data especificada:', error);
                throw new Error('Falhou em buscar leitura dentro da data especificada');
            }
        },
        leiturasRecentes: async () => {
            try {
                const [rows] = await connection.query('SELECT * FROM leitura ORDER BY dataLeitura DESC LIMIT 7');
                return rows;
            } catch (error) {
                console.error('Erro em buscar as leituras:', error);
                throw new Error('Falhou em buscar as leituras');
            }
        },
        kpisMedia: async () => {
            try{
                const [rows] = await connection.query(`
                    SELECT 
                        ROUND(AVG(CASE WHEN dataLeitura >= CURDATE() - INTERVAL 1 DAY THEN valor END),2) AS media1d,
                        ROUND(AVG(CASE WHEN dataLeitura >= CURDATE() - INTERVAL 2 DAY THEN valor END),2) AS media2d,
                        ROUND(AVG(CASE WHEN dataLeitura >= CURDATE() - INTERVAL 7 DAY THEN valor END),2) AS media7d,
                        ROUND(AVG(CASE WHEN dataLeitura >= CURDATE() - INTERVAL 30 DAY THEN valor END),2) AS media30d
                    FROM leitura;    
                `)
                return rows[0];
            } catch (error) {
                console.error('Erro em buscar as médias:', error);
                throw new Error('Falhou em buscar as médias');
            }
        }
    },
    Leitura: {
        sensor: async (parent) => {
            try {
                const [rows] = await connection.query('SELECT * FROM sensor WHERE equipmentID = ?', [parent.equipmentID]);
                return rows[0];
            } catch (error){
                console.error(`Erro ao buscar sensor para equipmentID ${parent.equipmentID}:`, error);
                throw new Error(`Falhou em buscar o sensor para equipmentID ${parent.equipmentID}`);
            }
        }
    },
    Mutation: {
        insertLeituras: async (_,{leituras}) => {
            const resultados = [];
            try {
                for(const leitura of leituras){
                    const [resposta] = await connection.query('INSERT INTO leitura (equipmentID,dataLeitura,valor) VALUES (?,?,?)', [leitura.equipmentID, leitura.dataLeitura, leitura.valor]);
                    const [sensor] = await connection.query('SELECT * FROM sensor WHERE equipmentID = ?', [leitura.equipmentID]);

                    resultados.push({
                        id: resposta.insertId,
                        sensor: sensor[0],  // Add the resolved sensor object here
                        dataLeitura: leitura.dataLeitura,
                        valor: leitura.valor
                    })
                }


                return resultados;
            } catch(error){
                console.error('Erro na inserção de dados:', error);
                throw new Error('Falhou em inserir os dados');
            }
        }
    }
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

const handler = startServerAndCreateNextHandler(server);

export async function POST(req) {
    return handler(req);
}

export async function GET(req) {
    return handler(req);
}