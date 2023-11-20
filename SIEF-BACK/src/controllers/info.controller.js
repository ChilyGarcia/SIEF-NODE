import { conexion } from "../db.js";
import util from "util";
import moment from "moment";

const queryAsync = util.promisify(conexion.query).bind(conexion);

export const newInfo = async (req, res) => {
  const {
    codigo,
    programa,
    periodo,
    inscritos,
    admitidos,
    matriculados,
    graduados,
  } = req.body;

  try {
    const nuevoInfo = {
      codigo,
      programa,
      periodo,
      inscritos,
      admitidos,
      matriculados,
      graduados,
    };

    const insertResults = await queryAsync(
      "INSERT INTO informacion SET ?",
      nuevoInfo
    );

    res.status(200).json({
      codigo: insertResults.insertId,
      programa: nuevoInfo.programa,
      periodo: nuevoInfo.periodo,
      inscritos: nuevoInfo.inscritos,
      admitidos: nuevoInfo.admitidos,
      matriculados: nuevoInfo.matriculados,
      graduados: nuevoInfo.graduados,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al agregar nueva información" });
  }
};

export const newAudit = async (req, res) => {
  const { accion, programa, fecha, usuario } = req.body;

  try {
    const nuevoAudit = {
      accion,
      programa,
      fecha,
      usuario,
    };

    const insertResults = await queryAsync(
      "INSERT INTO auditorias SET ?",
      nuevoAudit
    );

    res.status(200).json({
      id: insertResults.insertId,
      accion: nuevoAudit.accion,
      programa: nuevoAudit.programa,
      fecha: nuevoAudit.fecha,
      usuario: nuevoAudit.usuario,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al agregar nuevo auditoría" });
  }
};

export const getInfo = async (req, res) => {
  try {
    const selectResults = await queryAsync("SELECT * FROM informacion");
    const allFind = selectResults.map((info) => ({
      codigo: info.codigo,
      programa: info.programa,
      periodo: info.periodo,
      inscritos: info.inscritos,
      admitidos: info.admitidos,
      matriculados: info.matriculados,
      graduados: info.graduados,
    }));

    res.send(allFind);
  } catch (err) {
    console.error(err);
    res.status(500).send("An error occurred in get info");
  }
};

export const getInfoFiveYears = async (req, res) => {

  const { programa } = req.body;
  try {
    const selectResults = await queryAsync(
      "SELECT * FROM informacion WHERE programa = ? ORDER BY SUBSTRING_INDEX(periodo, '-', 1) DESC LIMIT 5",
      [programa]
    );

    const allFind = selectResults.map((info) => ({
      codigo: info.codigo,
      programa: info.programa,
      periodo: info.periodo,
      inscritos: info.inscritos,
      admitidos: info.admitidos,
      matriculados: info.matriculados,
      graduados: info.graduados,
    }));

    res.send(allFind);
  } catch (err) {
    console.error(err);
    res.status(500).send("An error occurred in get info");
  }
};

export const getAudits = async (req, res) => {
  try {
    const selectResults = await queryAsync("SELECT * FROM auditorias");
    const allFind = selectResults.map((audit) => ({
      accion: audit.accion,
      programa: audit.programa,
      fecha: moment(audit.fecha).format("YYYY-MM-DD"),
      usuario: audit.usuario,
    }));

    res.send(allFind);
  } catch (err) {
    console.error(err);
    res.status(500).send("An error occurred in get audits");
  }
};
