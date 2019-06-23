import { Query } from "mongoose";

abstract class Storage {
    protected static model: any;
    static async insert(x: any) {
        const Model = this.model;
        return await new Model(x).save();
    }
    static async update(x: any) {
        return this.model.findByIdAndUpdate(x._id, x);
    }
    static async delete(id: string) {
        return this.model.findByIdAndDelete(id);
    }
    //template method
    static async getAll() {
        return await this.populator(this.model.find());
    }
    //template method
    static async getById(id: string) {
        return await this.populator(this.model.findById(id));
    }
    //primitive method
    protected static async populator(items: Query<any>) {
        return await items;
    }
};

abstract class StorageCreator {
    //factory method
    static async makeItem(params: any): Promise<any> { };
}

export {
    Storage,
    StorageCreator
}