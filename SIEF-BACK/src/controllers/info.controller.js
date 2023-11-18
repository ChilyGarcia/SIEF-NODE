import Info from "../models/info.models.js";
import Audits from "../models/audits.model.js";

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
    const newInfo = new Info({
      codigo,
      programa,
      periodo,
      inscritos,
      admitidos,
      matriculados,
      graduados,
    });

    const infoSave = await newInfo.save();

    if (infoSave) {
      res.send({
        codigo: infoSave.codigo,
        programa: infoSave.programa,
        periodo: infoSave.periodo,
        inscritos: infoSave.inscritos,
        admitidos: infoSave.admitidos,
        matriculados: infoSave.matriculados,
        graduados: infoSave.graduados,
      });
    }
  } catch (err) {
    res.send("An error occurred");
  }
};

export const newAudit = async (req, res) => {
  const { accion, programa, fecha, usuario } = req.body;

  try {
    const newAudit = new Audits({
      accion,
      programa,
      fecha,
      usuario,
    });

    const auditSave = await newAudit.save();

    if (auditSave) {
      res.send({
        accion: auditSave.accion,
        programa: auditSave.programa,
        fecha: auditSave.fecha,
        usuario: auditSave.usuario,
      });
    }
  } catch (err) {
    console.log("An error ocurred");
  }
};

export const getInfo = async (req, res) => {
  try {
    const allFind = await Info.find().select({
      _id: 0,
      __v: 0,
    });

    res.send(allFind);
  } catch (err) {
    res.status(500).send("An error ocurred in get info");
  }
};

export const getAudits = async (req, res) => {
  try {
    const allFind = await Audits.find().select({
      _id: 0,
      __v: 0,
    });

    res.send(allFind);
  } catch (err) {
    res.status(500).send("An error ocurred in get info");
  }
};
