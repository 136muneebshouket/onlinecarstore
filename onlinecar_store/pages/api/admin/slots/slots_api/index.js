// import user from "@/models/user";
import slots_schema from "@/models/slots_schema";
import admin_schema from "@/models/admin_schema";
import dbConnect from "@/config/dbConnect";

export default async function handler(req, res) {
  dbConnect();
  try {
    switch (req.method) {
      case "POST":
        const { city, area, admin_token } = req.body;
        // console.log(ad_id)
        if (!city) {
          throw new Error("city is required");
        }
        if (!area) {
          throw new Error("area is required");
        }
        const checkadmin = await admin_schema.countDocuments({
          resetToken: admin_token,
        });
        if (!checkadmin) {
          throw new Error("Please Login as Admin ");
        }

        const find_slot = await slots_schema.findOne({ city: city });
        if (find_slot) {
          const report_exist = await slots_schema.findOne({
            "areas.name": area,
          });
          if (report_exist) {
            throw new Error("This slot Already exist");
          }
          if (!report_exist) {
            find_slot.areas.push({
              name: area,
              slots: [],
            });
            let new_slot = await find_slot.save();
            if (!new_slot) {
              throw new Error("Something went wrong");
            }
            res.status(200).json({
              success: true,
              message: "Your slot has been received",
            });
          }
        }
        if (!find_slot) {
          let newslot = await new slots_schema({
            city: city,
            areas: [
              {
                name: area,
                slot: [],
              },
            ],
          }).save();

          if (!newslot) {
            throw new Error("Something went wrong");
          }
          res.status(200).json({
            success: true,
            message: "Your slot has been received",
          });
        }

        break;
      default:
        return;
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
