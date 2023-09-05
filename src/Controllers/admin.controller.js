const { Response } = require("../services/services");
const { Organization } = require("../models/organization.model");

// Get a list of organizations (accessible by UserType 0)
module.exports.getOrganizationList = async (req, res) => {
    try {
        // Retrieve all organizations and populate 'user' field with 'name' and '_id'
        const data = await Organization.find().populate({
            path: 'user',
            select: 'name _id'
        });
        res.send(Response(false, "", data));

    } catch (error) {
        res.send(Response(true, error));
    }
};

module.exports.getOrganization = async (req, res) => {
    try {
        const _id = req.params.id;
        const organization = await Organization.findOne({ _id }).populate({
            path: "user",
            select: "-password -otp"
        });
        res.send(Response(false, "", organization));
    } catch (error) {
        res.send(Response(false, error));
    }
}

// Verify an organization (accessible by UserType 0)
module.exports.verifyOrganization = async (req, res) => {
    try {
        if (req.user.userType === 0) {
            const orgId = req.body.organization_id;

            // Update the 'is_verified' field of the organization and retrieve the updated organization
            const organization = await Organization.findOneAndUpdate(
                { _id: orgId },
                { $set: { is_verified: true } },
                { new: true }
            ).populate({
                path: 'user',
                select: 'name _id'
            });

            if (organization) {
                res.send(Response(false, "Organization marked as verified", organization));
            } else {
                throw "Failed to update organization verification status";
            }
        } else {
            throw "You don't have access to this action";
        }
    } catch (error) {
        res.send(Response(true, error));
    }
};
